import {useState} from "react";
import {orderBy} from "firebase/firestore";

export function ProductCatalogContainer() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedByOrder, setSelectedByOrder] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<number[]>([0, 0]);
    const handleCategoryChange = (category: string | null) => {
        setSelectedCategory(category);
    };

    const handlePriceRangeChange = (priceRange: number[]) => {
        setSelectedPrice(priceRange);
    };

    const handleByOrder = (order: string | null) => {
        setSelectedByOrder(order);
    };

    const filteredProducts = [
    // Здесь должен быть код фильтрации товаров на основе выбранных фильтров
    // Например, используйте selectedCategory, selectedPriceRange, selectedBrand для фильтрации
    // Результат должен быть массивом отфильтрованных товаров
  ];


    return <></>
}