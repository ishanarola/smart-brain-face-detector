import { useState } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
// import SignIn from "./Components/Authorization/SignIn/SignIn";
// import Navigation from "./Components/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import {
  ClarifaiApiCall,
  calculateFaceLocation,
} from "./Components/ClarifaiApiCall";
const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState([]);
  const [error, setError] = useState();
  const [showImage, setShowImage] = useState(false);
  const handleInputChange = (e) => {
      setError("");
      setBox([]);
      setShowImage(false);
      setInput(e.target.value);
  };

  const validateUrl = (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
    return new Promise((resolve) => {
      img.onerror = () => resolve(false);
      img.onload = () => resolve(true);
    });
  };

  const handleSubmit = () => {
    setImageUrl(input)
    validateUrl(input).then(async (res) => {
      if (res) {
        setShowImage(true);
        const imageData = await ClarifaiApiCall(input);
        if (imageData.status.code === 10000) {
          if (Object.keys(imageData.outputs[0].data).length > 0) {
            setError(" ");
            setBox(calculateFaceLocation(imageData));
          } else {
            setError("Please enter valid image URL.");
          }
        } else {
          setError("Something went wrong. Please try again with another URL.");
        }
      } else {
        setShowImage(false);
        setError("Please enter image Url.");
      }

    })




  };

  return (
    <div>
      {/* <SignIn/> */}
      {/* <div className="d-flex justify-content-between"> */}
      <Logo />
      {/* <Navigation /> */}
      {/* </div> */}
      <ImageLinkForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {error && (
        <span className="text-center mt-3 fs-4 fw-medium text-warning">
          {error}
        </span>
      )}
      {showImage && <FaceRecognition imageUrl={imageUrl} box={box} />}
      <ParticlesBg type="cobweb" bg={true} color="#ffffff" />
    </div>
  );
};

export default App;
