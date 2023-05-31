import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from "../../config";

type Category = {
    id: number;
    name: string;
    fk_subcategoryid: number;
    createdAt: string;
    updatedAt: string;
};

type CategoryFilterProps = {
    selectedCategory: string[];
    onchange: (categories: string[]) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({selectedCategory, onchange}) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/subcategory`);
            const data = response.data;
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        let updatedCategories: string[];

        if (selectedCategory.includes(selectedValue)) {
            updatedCategories = selectedCategory.filter((category) => category !== selectedValue);
        } else {
            updatedCategories = [...selectedCategory, selectedValue];
        }

        onchange(updatedCategories);
    };

    return (
        <>
            <h3>Категории</h3>
            <div className="product-catalog__categories">
                {categories.map((category) => (
                    <div className="product-catalog__category" key={category.id}>
                        <input
                            type="checkbox"
                            id={category.id.toString()}
                            value={category.name}
                            checked={selectedCategory.includes(category.name)}
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor={category.id.toString()}>{category.name}</label>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CategoryFilter;
