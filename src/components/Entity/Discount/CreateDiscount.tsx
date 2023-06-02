import React, {useEffect, useState} from 'react';
import axios from 'axios';
import config from "../../../config";
import "../AddEditForm.scss"
import parseJwt from "../../../jwtUtils";

interface Discount {
    title: string;
    description: string;
    value: number;
    user: number;
    products: number;
}


interface Product {
    id: number;
    name: string;
    price: number;
}

const CreateSeller: React.FC = () => {
    const userInfo = parseJwt(localStorage.getItem('token'))
    const [products, setProducts] = useState<Product[]>([]);
    const [discount, setDiscount] = useState<Discount>({
        title: '',
        description: '',
        value: 0,
        user: userInfo.id,
        products: 1,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setDiscount((prevDiscount) => ({
            ...prevDiscount,
            [name]: name === 'value' || name === 'products' ? parseInt(value) : value,
        }));
        console.log(discount)
    };
    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${config.apiUrl}/product`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setProducts(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token')
        try {
            await axios.post(`${config.apiUrl}/discount`, discount, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Discount created successfully!');
        } catch (error) {
            console.error('Failed to create discount:', error);
        }
    };

    return (
        <div className="create-user">
            <h2>Создать акцию</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="title"
                        value={discount.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-item">
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={discount.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-item">
                    <label>Размер скидки:</label>
                    <input
                        type="number"
                        name="value"
                        value={discount.value}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-item">
                    <label>Товар:</label>
                    <select name="products" value={discount.products} onChange={handleChange}>
                        {products.map((product: any) => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default CreateSeller;
