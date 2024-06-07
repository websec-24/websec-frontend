import React, { useState } from 'react';

const ProductReviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Text:</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <label>Upload File:</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductReviewForm;
