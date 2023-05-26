
import { useParams } from "react-router-dom";
import { ProductDetail } from "../components/Product/ProductDetail";
import { Loader } from "../components/UI/Loader/Loader";

import {useEffect, useState} from "react";
import axios from "axios";
import config from "../config";

export function ProductDetailPage() {
	const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [productDoc, setProductDoc] = useState<any>(null);
  const [productImg, setProductImg] = useState<any>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/${id}`);
        setProductDoc(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    const fetchProductImages = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product-img/product/${id}`);
        setProductImg(response.data)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProductImages();
    fetchProductData();
  }, [id]);


	return (
		<>
			{loading && <Loader />}
			{productDoc && (
				<ProductDetail productImages={productImg} product={productDoc} />
			)}
		</>
	);
}
