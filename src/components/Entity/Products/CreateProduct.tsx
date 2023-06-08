import React, {useEffect, useState} from 'react';
import axios from 'axios';
import config from "../../../config";
import "../AddEditForm.scss"
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

const CreateProduct: React.FC = () => {
    const userInfo = parseJwt(localStorage.getItem('token'))
    const [subCategory, setSubCategory] = useState<SubCategory[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [product, setProduct] = useState<Product>({
        name: '',
        sub_category: 1,
        description: '',
        price: 0,
        owner: userInfo.id,
        images: [],
        lenght: 0,
        width: 0,
        height: 0,
        weight: 0,
    });
    const [imageInputs, setImageInputs] = useState<string[]>(['']);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    useEffect(() => {
        fetchSubCategory();
        fetchUsers()
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
            await axios.post(`${config.apiUrl}/product`, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Product created successfully!');
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    const handleImageInputChange = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://62.109.26.91/upload.php', formData);
                const imageUrl = response.data.url;
                console.log(response.data.url)

                const updatedImages = [...product.images];
                updatedImages[index] = imageUrl;

                setProduct((prevProduct) => ({
                    ...prevProduct,
                    images: updatedImages,
                }));

                const updatedImageInputs = [...imageInputs];
                updatedImageInputs[index] = "uploaded";
                setImageInputs(updatedImageInputs);
            } catch (error) {
                console.error('Failed to upload image:', error);
            }
        }
    };


    const handleAddImageInput = () => {
        setImageInputs([...imageInputs, '']);
        setImageFiles([...imageFiles, null as unknown as File]);
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
                        required
                    />
                </div>
                <div className="form-item">
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-item form-images">
                    <label>Изображения:</label>
                    {imageInputs.map((imageInput, index) => (
                        <div key={index} className="file-input-wrapper">
                            <input
                                className="file-input"
                                type="file"
                                name={`images-${index}`}
                                accept="image/*"
                                required
                                onChange={(event) => handleImageInputChange(index, event)}
                            />
                            <span className="file-input-label">
                                {imageInput ? 'Файл загружен' : 'Выбрать файл'}
                            </span>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddImageInput}>
                        Добавить изображение
                    </button>
                </div>
                <div className="form-item">
                    <label>Ширина:</label>
                    <input
                        type="number"
                        name="width"
                        value={product.width}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label>Высота:</label>
                    <input
                        type="number"
                        name="height"
                        value={product.height}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label>Вес:</label>
                    <input
                        type="number"
                        name="weight"
                        value={product.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label>Длина:</label>
                    <input
                        type="number"
                        name="lenght"
                        value={product.lenght}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label>Цена:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        required
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

export default CreateProduct;
