import { useCallback  } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import usePanZoom from "use-pan-and-zoom";

import "../styles/photo-editor.scss";

const PhotoEditor = () => {
  const { transform, panZoomHandlers, setContainer , setPan } = usePanZoom({});
  const API_KEY = "ed302f5b3c3c44d2bd1fce06f63792e2";
const location = useLocation();
const search = new URLSearchParams(location.search);

 const url = ` https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&full_page`;

console.log(url);


  const onDrop = useCallback((droppedFiles) => {
    console.log(droppedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      multiple: false,
      accept: "image/*",
    });

  const selectedImage = acceptedFiles.length > 0 && (
    <img
      alt={acceptedFiles[0].name}
      key={acceptedFiles[0].path}
      src={URL.createObjectURL(acceptedFiles[0])}
    />
  );



  return (
    <div className="App">
      <div className="photo-editor">
        <div className="photo-viewer">
          <div
            className="image-outer-container"
            ref={(el) => setContainer(el)}
            {...panZoomHandlers}
            onClickCapture={() => setPan({ x: 0, y: 0 })}
            onMouseOut={() => setPan({ x: 0, y: 0 })}
          >
            <div className="image-inner-container" style={{ transform }}>
              {selectedImage}
            </div>
          </div>
        </div>
        <div>
          {acceptedFiles.length > 0 && (
            <a
              href={selectedImage.props.src}
              download={selectedImage.props.src}
            >
              <button className="button"> Download Photo </button>
            </a>
          )}
        </div>
        <div>
          {acceptedFiles.length > 0 && (
            <a
              href={selectedImage.props.src}
              download={selectedImage.props.src}
            >
              <button className="button"> Download ScreenShot </button>
            </a>
          )}
        </div>
        <div className="drop-zone" {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="text">
            {isDragActive ? (
              <p>Drop the images here</p>
            ) : (
              <div>
                <i className="n-icon n-icon-upload"></i>
                <p>Drag &amp; Drop or click to select an image</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoEditor;
