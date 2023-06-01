import {useEffect, useState} from "react";
import "./product-catalog.scss"
import CategoryFilter from "./CategoryFilter";
import config from "../../config";
import axios from "axios";
import {ProductsList} from "../Products/ProductsList";
import PriceFilter from "./PriceFilter";
import Pagination from "../Pagination/Pagination";

export function ProductCatalogContainer({category, search}: { category?: string; search?: string }) {
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedByOrder, setSelectedByOrder] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<number[]>([0, 35000]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
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
                page: currentPage,
                take: 10,
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
            const totalCount = parseInt(response.headers['x-total-count']);
            const itemsPerPage = 10;
            const totalPages = Math.ceil(totalCount / itemsPerPage);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchFilteredProducts()
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
                <div>
                    <ProductsList products={filteredProducts}/>
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
                </div>
            </div>
        </div>
    </>
}