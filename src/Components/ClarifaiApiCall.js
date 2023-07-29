export const ClarifaiApiCall = (imageUrl) => {
  const PAT = "284c9690ae0c43c4a3e95add289de768";
  const USER_ID = "85datb9523in";
  const APP_ID = "smart_brain_01";

  // const MODEL_ID = 'face-recognition';
  // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  const imageData = fetch(
    "https://api.clarifai.com/v2/models/face-detection/outputs",
    requestOptions
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log("error", error));
  return imageData;
};

export const calculateFaceLocation = (data) => {
  const faceLocationRegions = data.outputs[0].data.regions;

  let imageInput = document.getElementById("imageInput");
  if (imageInput) {
    let width = Number(imageInput.width);
    let height = Number(imageInput.height);

    let faceLocations = faceLocationRegions.map((faceLocationRegion) => {
      let bounding_box = faceLocationRegion.region_info.bounding_box;
      return {
        leftCol: bounding_box.left_col * width,
        rightCol: width - bounding_box.right_col * width,
        topRow: bounding_box.top_row * height,
        bottomRow: height - bounding_box.bottom_row * height,
      };
    });
    return faceLocations;
  }
  return;
};
