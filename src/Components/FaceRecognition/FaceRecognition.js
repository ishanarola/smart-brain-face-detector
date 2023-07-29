import "./FaceRecognition.css";
const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="my-3 d-flex justify-content-center">
      {imageUrl && (
        <div className="position-absolute">
          <img
            id="imageInput"
            className="shadow"
            src={imageUrl}
            width="600px"
            height="auto"
            alt="person"
          />
          {box &&
            box.map((detection_box) => {
              return (
                <div
                  className="detection-box"
                  key={detection_box.bottomRow}
                  style={{
                    top: detection_box.topRow,
                    right: detection_box.rightCol,
                    bottom: detection_box.bottomRow,
                    left: detection_box.leftCol,
                  }}
                ></div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
