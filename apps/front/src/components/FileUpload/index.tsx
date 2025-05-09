import { useRef } from 'react';

import { MediaDTO } from '../../api/file';
import { useFileApi } from '../../hooks/useApi';

type FileUploadProps = {
  pictureOnly?: boolean;
  onFileUploaded?: (media: MediaDTO) => Promise<any>;
};

export function FileUpload({
  pictureOnly = false,
  onFileUploaded,
}: FileUploadProps) {
  const api = useFileApi();

  const inputRef = useRef<HTMLInputElement>(null);
  const openDialog = () => inputRef.current?.click();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await api.files.uploadFile({
        file
    })

    await onFileUploaded?.(result);
    e.target.value = ''; // reset so picking the same file again still triggers onChange
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={pictureOnly ? 'image/*' : undefined}
        onChange={handleChange}
      />
      <div className="btn btn-dark me-2 mb-2" onClick={openDialog}>
        <i className="feather icon-upload-cloud me-1" />
        Upload
      </div>
    </>
  );
}
