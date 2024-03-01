// Gallery.jsx
import React from 'react';

const Gallery = ({ images }) => {
  return (
    <div>
      <h2>Image Gallery</h2>
      {images.length > 0 ? (
        <ul>
          {images.map((image, index) => (
            <li key={index}>
              <img src={image} alt={`Screenshot ${index + 1}`} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No screenshots to display.</p>
      )}
    </div>
  );
};

export default Gallery;