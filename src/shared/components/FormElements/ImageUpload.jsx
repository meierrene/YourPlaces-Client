import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import './ImageUpload.css';

function ImageUpload({ id, center, onInput, errorText }) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => setPreviewUrl(fileReader.result);
    fileReader.readAsDataURL(file);
  }, [file]);

  const handlePicked = e => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files || e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  const handleImage = () => {
    imageRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={id}
        ref={imageRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handlePicked}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Please pick an image.</p>
          )}
        </div>
        <Button type="button" onClick={handleImage}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
}

export default ImageUpload;
