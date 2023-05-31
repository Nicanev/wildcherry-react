import {useEffect, useState} from "react";
import "./product-catalog.scss"
import CategoryFilter from "./CategoryFilter";
import config from "../../config";
import axios from "axios";
import {ProductsList} from "../Products/ProductsList";
import PriceFilter from "./PriceFilter";

export function ProductCatalogContainer({category, search}: { category?: string; search?: string }) {
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedByOrder, setSelectedByOrder] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<number[]>([0, 35000]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const handleCategoryChange = (categories: string[]) => {
        setSelectedCategory(categories);
    };
    useEffect(() => {
        if (category) {
            setSelectedCategory([category]);
        }
    }, [category]);
    const handlePriceRangeChange = (priceRange: number[]) => {
        setSelectedPrice(priceRange);
        console.log(priceRange)
    };

    const handleByOrder = (order: string | null) => {
        setSelectedByOrder(order);
    };

    useEffect(() => {
        fetchFilteredProducts();
    }, [selectedCategory, selectedPrice]);

    const fetchFilteredProducts = async () => {
        try {
            const queryParams: any = {
                order: 'ASC',
                page: 1,
                take: 20,
                orderBy: 'score',
                priceStart: selectedPrice[0],
                priceEnd: selectedPrice[1],
                scoreStart: 0,
                scoreEnd: 5,
                category: selectedCategory.join(','),
            };

            if (search) {
                queryParams.search = search;
            }

            const response = await axios.get(`${config.apiUrl}/product`, {
                params: queryParams,
            });

            const data = response.data;
            setFilteredProducts(data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    };


    return <>
        <div className="product-catalog">
            <div className="product-catalog__container">
                <div className="product-catalog__filter">
                    <h2>Фильтры</h2>
                    <div className="product-catalog__filters">
                        <CategoryFilter selectedCategory={selectedCategory} onchange={handleCategoryChange}/>
                        <PriceFilter
                            selectedPrice={selectedPrice}
                            onChange={handlePriceRangeChange}
                        />
                    </div>
                </div>
                <ProductsList products={filteredProducts}/>
            </div>
        </div>
    </>
}