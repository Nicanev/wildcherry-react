import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../../config";

interface Category {
  id: number;
  name: string;
}

const CreateSubcategory: React.FC = () => {
  const [subCategoryName, setSubCategoryName] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get<Category[]>(`${config.apiUrl}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.name === 'name') {
      setSubCategoryName(event.target.value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const categoryValue = (event.currentTarget.elements.namedItem(
        'category'
      ) as HTMLSelectElement).value;
      await axios.post(
        `${config.apiUrl}/subcategory`,
        { name: subCategoryName, category: categoryValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Subcategory created successfully!');
    } catch (error) {
      console.error('Failed to create subcategory:', error);
    }
  };

  return (
    <div className="create-user">
      <h2>Создать подкатегорию</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label>Название:</label>
          <input
            type="text"
            name="name"
            value={subCategoryName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-item">
          <label>Категория:</label>
          <select name="category" required>
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateSubcategory;
