import {ProductCatalogContainer} from "../components/Catalog/ProductCatalogContainer";
import {useParams} from "react-router-dom";

export function CatalogPage() {
    const { category } = useParams();
    return   <>
      {category && <ProductCatalogContainer category={category} />}
      {!category && <ProductCatalogContainer />}
    </>
}