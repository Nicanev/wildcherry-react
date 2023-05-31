import React, {useEffect, useState} from 'react';

type PriceFilterProps = {
    selectedPrice: number[];
    onChange: (priceRange: number[]) => void;
};

const PriceFilter: React.FC<PriceFilterProps> = ({selectedPrice, onChange}) => {
    const [minPrice, setMinPrice] = useState(selectedPrice[0]);
    const [maxPrice, setMaxPrice] = useState(selectedPrice[1]);

    const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const minValue = Number(event.target.value);
        setMinPrice(minValue);
        onChange([minValue, maxPrice]);
    };

    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maxValue = Number(event.target.value);
        setMaxPrice(maxValue);
        onChange([minPrice, maxValue]);
    };

    useEffect(() => {
        setMaxPrice(35000);
    }, []);

    return (
        <div className="price-filter">
            <h3>Цена</h3>
            <div className="price-filter__item-container">
                <div className='price-filter__item'>
                    <label htmlFor="minPrice">От:</label>
                    <input
                        type="number"
                        className="minPrice"
                        id="minPrice"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                    />
                </div>
                <div className='price-filter__item'>
                    <label htmlFor="maxPrice">До:</label>
                    <input
                        className="maxPrice"
                        type="number"
                        id="maxPrice"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceFilter;
