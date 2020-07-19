import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import classes from './UploadZone.module.scss';

type PropsType = {
  onUploadCb: (params: File[]) => void;
};

const UploadZone: React.FC<PropsType> = (_props) => {
  const [files, setFiles] = useState<any>([]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      _props.onUploadCb(acceptedFiles);
    }
  });
  return (
    <div>
      <div {...getRootProps({className: classes.dropzone})}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the bike image here ...</p>
        ) : (
          <p>Drag &amp; drop some file here, or click to select file</p>
        )}
      </div>

      {files ? <ul>
        {files.map((file, i) => (
          <li key={i}>
            {`File:${file.name} Type:${file.type} Size:${file.size} bytes`}
          </li>
        ))}
      </ul> : null}
    </div>
  );
};

export default UploadZone;