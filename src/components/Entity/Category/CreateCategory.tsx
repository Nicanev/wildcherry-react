import React, { useState } from 'react';
import axios from 'axios';
import config from "../../../config";

const CreateCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${config.apiUrl}/category`, { name: categoryName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Category created successfully!');
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  return (
    <div className="create-user">
      <h2>Создать категорию</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label>Название:</label>
          <input
            type="text"
            name="name"
            value={categoryName}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateCategory;
