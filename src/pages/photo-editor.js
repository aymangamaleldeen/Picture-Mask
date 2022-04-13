import { useCallback, createRef } from "react";
import { useScreenshot } from "use-react-screenshot";

import { useDropzone } from "react-dropzone";
import usePanZoom from "use-pan-and-zoom";

import "../styles/photo-editor.scss";

const PhotoEditor = () => {
  const { transform, panZoomHandlers, setContainer, setPan } = usePanZoom({});

  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(ref.current);

  const onDrop = useCallback((droppedFiles) => {
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
      <div className="photo-editor" ref={ref}>
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
        {/* <div>
          {acceptedFiles.length > 0 && (
            <a
              href={selectedImage.props.src}
              download={selectedImage.props.src}
            >
              <button className="button"> Download Photo </button>
            </a>
          )}
        </div> */}
        <div>
          {acceptedFiles.length > 0 && (
            <a href={image} download={image}>
              <button className="button" onClick={getImage}>
                Download ScreenShot
              </button>
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
