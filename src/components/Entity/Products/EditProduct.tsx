import React, {useEffect, useState} from 'react';
import axios from 'axios';
import config from "../../../config";
import "../AddEditForm.scss"
import refreshToken from "../../../tokenUtils";
import parseJwt from "../../../jwtUtils";

interface Product {
    name: string;
    description: string;
    price: number;
    sub_category: number;
    owner: number;
    images: any;
    lenght: number;
    width: number;
    height: number;
    weight: number;
}

interface SubCategory {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    profile: any;
    roles: any;
}

interface EditProductProps {
    productId: number;
}

const EditProduct: React.FC<EditProductProps> = ({productId}) => {
    const userInfo = parseJwt(localStorage.getItem('token'))
    const [subCategory, setSubCategory] = useState<SubCategory[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [product, setProduct] = useState<Product>({
        name: '',
        sub_category: 1,
        description: '',
        price: 0,
        owner: userInfo.id,
        images: ['https://c.dns-shop.ru/thumb/st4/fit/500/500/8be3e2f04d108b4f8f9bf574406655f5/7c80865de448b9054d6bd5b08dc25df8674ff369065f8a8ce2fc392625bd0ea6.jpg.webp'],
        lenght: 0,
        width: 0,
        height: 0,
        weight: 0,
    });

    useEffect(() => {
        fetchSubCategory();
        fetchUsers()
        fetchProduct()
    }, []);

    const fetchProduct = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${config.apiUrl}/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setProduct(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };
    const fetchSubCategory = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${config.apiUrl}/subcategory`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setSubCategory(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const fetchUsers = async () => {
        if (!userInfo.roles[2]) {
            setUsers([userInfo])
            return
        }
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${config.apiUrl}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUsers(response.data);
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
            await axios.put(`${config.apiUrl}/product/${productId}`, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Product updated successfully!');
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    return (
        <div className="create-user">
            <h2>Изменить продукт</h2>
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
                    <select name="subcategory" value={product.sub_category} onChange={handleChange}>
                        {subCategory.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-item">
                    <label>Продавец:</label>
                    <select name="owner" value={product.owner} onChange={handleChange} disabled={!userInfo.roles[2]}>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>{user.email} </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default EditProduct;
