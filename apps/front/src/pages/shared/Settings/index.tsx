import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { UserDTO } from '../../../api';
import { MediaDTO } from '../../../api/file';
import { FileUpload } from '../../../components/FileUpload';
import { GeoLocationMap } from '../../../components/GeoLocation';
import { Img } from '../../../components/Img';
import { useConnectedUser } from '../../../hooks/useAuth';
import { useUpdateUser } from '../../../hooks/useUser';
import {
  addressToString,
  getGeolocationText,
  stringToAddress,
} from '../../../utils/getGeolocationText';

export function Settings() {
  const { data: user } = useConnectedUser();
  const [data, setData] = useState<UserDTO | null>(user ?? null);
  const { mutate } = useUpdateUser(true);
  const [showLocation, setShowLocation] = useState(false);
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (user) {
      setData(user);
      if (user.address) {
        (async function () {
          setLocation(await getGeolocationText(stringToAddress(user.address!)));
        })();
      }
    }
  }, [user, setData, setLocation]);

  const handleChange = useCallback(
    (key: keyof UserDTO, value: any) => {
      if (data) {
        setData({ ...data, [key]: value });
      }
    },
    [data, setData],
  );

  const handleAvatarUpload = useCallback(
    async (file: MediaDTO) => {
      handleChange('avatarId', file.id);
    },
    [handleChange],
  );

  const handleSave = useCallback(() => {
    let valid = true;

    if (data) {
      if (!data.name?.length) {
        toast.error('Le nom est obligatoir');
        valid = false;
      }
      if (!data.email?.length) {
        toast.error('Email est obligatoir');
        valid = false;
      }

      if (valid) {
        mutate(data);
      }
    }
  }, [data]);

  if (!user || !data) {
    return null;
  }

  return (
    <>
      <h4 className="mb-3">Account Settings</h4>
      <h6 className="mb-4">Profile Picture</h6>
      <div className="d-flex align-items-center mb-4">
        <span className="avatar avatar-xl me-2">
          <Img mediaId={data.avatarId} className="rounded-circle" alt="user" />
        </span>
        <div>
          <FileUpload pictureOnly onFileUploaded={handleAvatarUpload} />
          <Link
            to="#"
            className="btn btn-light mb-2"
            onClick={() => handleChange('avatarId', null)}
          >
            Remove
          </Link>
        </div>
      </div>
      <h6>General Information</h6>
      <div className="general-info mb-0">
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={data.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
          </div>
        </div>
        <h6>Address</h6>
        {location && <p>{location}</p>}
        <span
          onClick={() => setShowLocation(true)}
          className="link-primary text-decoration-underline fs-14"
          style={{ cursor: 'pointer' }}
        >
          Selectionner
        </span>
        <GeoLocationMap
          show={showLocation}
          onHide={() => setShowLocation(false)}
          handleSave={(geolocation, text) => {
            if (geolocation) {
              setLocation(text);
              handleChange('address', addressToString(geolocation));
            }
          }}
          geoLocation={data.address ? stringToAddress(data.address) : null}
        />
        <div className="acc-submit d-flex justify-content-end align-items-center">
          <div className="btn btn-dark" onClick={handleSave}>
            Save
          </div>
        </div>
      </div>
    </>
  );
}
