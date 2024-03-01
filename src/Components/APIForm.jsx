import React from 'react';

const APIForm = ({ inputs, handleChange, onSubmit, inputsInfo }) => {
  return (
    <div>
      <h2>Select Your Image Attributes:</h2>
      <form className="form-container" onSubmit={onSubmit}>
        {inputs && Object.entries(inputs).map(([category, value], index) => (
          <div key={index}>
            <h3>{category}</h3>
            {category === 'response_type' ? (
              <select name={category} value={value} onChange={handleChange} className="textbox">
                <option value="json">JSON</option>
                <option value="image">Image</option>
              </select>
            ) : (
              <input
                type="text"
                name={category}
                value={value}
                placeholder="Input this attribute..."
                onChange={handleChange}
                className="textbox"
              />
            )}
            <p>{inputsInfo[index]}</p>
          </div>
        ))}
        <button type="submit" className="button">Take that Pic! 🎞</button>
      </form>
    </div>
  );
};

export default APIForm;

