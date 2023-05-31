import {ProductCatalogContainer} from "../components/Catalog/ProductCatalogContainer";
import {useParams} from "react-router-dom";


const SearchPage: React.FC = () => {
    const {search} = useParams<{ search: string }>();


    return (
        <div className='search__container'>
            <h1 >Результат поиска по запросу: {search}</h1>
            <ProductCatalogContainer search={search}/>
        </div>
    );
};

export default SearchPage;