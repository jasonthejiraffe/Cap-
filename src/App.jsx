import React, { useState } from 'react';
import './App.css';
import APIForm from './Components/APIForm'; // Adjust the path as necessary
import Gallery from './Components/Gallery'; // Ensure the path is correct
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {
  const [inputs, setInputs] = useState({
    url: "",
    format: "jpeg", // Default value as an example
    no_ads: "false",
    no_cookie_banners: "false",
    width: "1920", // Default value
    height: "1080", // Default value
    response_type: "json", // Added for users to select response type
  });

  const [currentImage, setCurrentImage] = useState(null); // State to store the screenshot URL or error message
  const [prevImages, setPrevImages] = useState([]); // State to keep track of all images

  const inputsInfo = [
    "Input a link to any website you would like to take a screenshot of. Include https or any protocol in the URL",
    "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
    "Input true or false if you would like your website screenshot to not contain any ads",
    "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
    "Choose the width of your screenshot (in pixels)",
    "Choose the height of your screenshot (in pixels)",
    "Choose the response type for the screenshot API: 'json' or 'image'",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${encodeURIComponent(inputs.url)}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_ads=${inputs.no_ads}&no_cookie_banners=${inputs.no_cookie_banners}&response_type=${inputs.response_type}`;

    try {
      const response = await fetch(apiUrl);

      if (inputs.response_type === 'json') {
        const data = await response.json();
        if (data.error) {
          console.error("API Error:", data.message);
          alert("Error: " + data.message);
        } else {
          setCurrentImage(data.url);
          setPrevImages(images => [...images, data.url]); // Save every successful fetch
        }
      } else if (inputs.response_type === 'image') {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setCurrentImage(imageUrl);
        setPrevImages(images => [...images, imageUrl]); // Save every successful fetch
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while fetching the screenshot: " + error.message);
    }
  };

  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>
      <APIForm
        inputs={inputs}
        handleChange={handleChange}
        onSubmit={onSubmit}
        inputsInfo={inputsInfo}
      />
      {currentImage && (
        <div>
          <h2>Your Screenshot</h2>
          <img src={currentImage} alt="Screenshot" />
        </div>
      )}
            {/* Gallery component to display the list of images */}
            <Gallery images={prevImages} />
    </div>
  );
};

export default App;


