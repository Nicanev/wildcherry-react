import React, {useEffect, useState} from 'react';
import axios from 'axios';
import config from "../../../../config";
import "../AddEditForm.scss"

interface Product {
    name: string;
    description: string;
    price: number;
    sub_category: number;
    owner: number;
    images: string;
    lenght: number;
    width: number;
    height: number;
    weight: number;
}

interface SubCategory {
    id: number;
    name: string;
}

const CreateProduct: React.FC = () => {
    const [subCategory, setSubCategory] = useState<SubCategory[]>([]);
    const [product, setProduct] = useState<Product>({
        name: '',
        sub_category: 1,
        description: '',
        price: 0,
        owner: 0,
        images: '',
        lenght: 0,
        width: 0,
        height: 0,
        weight: 0,
    });
    useEffect(() => {
        fetchSubCategory();
    }, []);
    const fetchSubCategory = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${config.apiUrl}/subcategory`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setSubCategory(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProduct((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value,
        }));
        console.log(product)
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token')
        try {
            await axios.post(`${config.apiUrl}/product`, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('User created successfully!');
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <div className="create-user">
            <h2>Создать продукт</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label>Subcategory:</label>
                    {/*<input*/}
                    {/*    type="tel"*/}
                    {/*    name="phone"*/}
                    {/*    value={product.phone}*/}
                    {/*    onChange={handleChange}*/}
                    {/*/>*/}
                    <select name="subcategory" value={product.sub_category} onChange={handleChange}>
                        {subCategory.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-item">
                    <label>Продавец:</label>
                    <select name="owner" value={product.owner} onChange={handleChange}>
                        <option value="11">1</option>
                    </select>
                </div>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default CreateProduct;
