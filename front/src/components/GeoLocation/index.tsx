/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getGeolocationText } from '../../utils/getGeolocationText';
import { useConnectedUser } from '../../hooks/useAuth';
import { Address } from '../../api';

interface GeoLocationProps {
  show: boolean;
  onHide: () => void;
  handleSave?: (geoLocation: Address | null, text: string) => void;
  geoLocation?: Address | null;
}

export function GeoLocationMap(
  { onHide, show, handleSave, geoLocation }: GeoLocationProps = {
    onHide: () => {},
    show: false,
    handleSave: () => {},
    geoLocation: null,
  },
) {
  const { data: user } = useConnectedUser();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [text, setText] = useState('');
  const [geoLoc, setGeoLoc] = useState<Address | null>(
    geoLocation ?? (user?.address as Address) ?? null,
  );

  const setMarkerOnMap = useCallback(() => {
    if (mapRef.current && geoLoc) {
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
        markerRef.current = null;
      }

      markerRef.current = L.marker([geoLoc.latitude, geoLoc.longitude]);
      markerRef.current.addTo(mapRef.current);
      mapRef.current.flyTo([geoLoc.latitude, geoLoc.longitude], 15);

      getGeolocationText(geoLoc).then(setText);
    }
  }, [geoLoc, mapRef.current, setText]);

  useEffect(() => {
    setMarkerOnMap();
  }, [setMarkerOnMap, geoLoc]);

  useEffect(() => {
    handleSave?.(geoLoc, text);
  }, [geoLoc, text, handleSave]);

  const init = useCallback(() => {
    if (containerRef.current) {
      mapRef.current = L.map(containerRef.current).setView(
        [34.30333389334934, 9.514391023206112],
        6,
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
      }).addTo(mapRef.current);

      mapRef.current.on('click', (e) =>
        setGeoLoc({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }),
      );

      setTimeout(() => mapRef.current?.invalidateSize(), 500);

      if (geoLoc) {
        setMarkerOnMap();
      }
    }
  }, [containerRef.current, mapRef.current, setMarkerOnMap]);

  const handleCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setGeoLoc(position.coords),
    );
  }, [setGeoLoc]);

  const hide = useCallback(() => {
    markerRef.current?.off();
    markerRef.current?.remove();
    markerRef.current = null;

    mapRef.current?.off();
    mapRef.current?.remove();
    mapRef.current = null;

    onHide();
  }, [onHide, mapRef.current, markerRef.current]);

  return (
    <Modal show={show} onHide={hide} size="xl" centered onEntered={init}>
      <Modal.Body>
        <div
          className="position-relative overflow-hidden m-3 border border-2 border-dark"
          style={{ height: '400px' }}
        >
          <div className="h-100 w-100" ref={containerRef}></div>
        </div>
        <span>{text}</span>

        <div className="d-flex align-items-center justify-content-center">
          <div className="btn btn-primary" onClick={handleCurrentLocation}>
            Utiliser la localisation actuelle
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
