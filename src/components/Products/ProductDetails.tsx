import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import BecomeSeller from "../BecomeSeller";
import Title from "../Title";
import FAQSection from "../FAQ's";
import Product from "./Product";
import BestSellers from "./BestSellers";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CONFIG } from "../../config";

const ProductDetails: React.FC = () => {
  const [productData, setProductData] = useState<any>(null);
  const [SimilarProductsData, setSimilarProductsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state: any) => state.userData.data);
  const AuthReducer = useSelector((state: any) => state.auth);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const headers: Record<string, string> = {
          "Cache-Control": "no-cache",
        };

        if (AuthReducer && userData?.access_token) {
          headers.Authorization = `Bearer ${userData.access_token}`;
        }
        const response = await axios.get(
          `${CONFIG?.API_ENDPOINT}/user/products/${productId}`,
          { headers }
        );
        setSimilarProductsData(response?.data?.data?.similarProducts);
        setProductData(response?.data?.data?.product);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [userData?.access_token, productId]);

  return (
    <div>
      <Header />
      <Title
        title={"Product"}
        description={productData?.name || "Marble Queen Pothos"}
      />
      <Product productData={productData} isLoading={isLoading} />
      <FAQSection
        FAQSData={productData?.FAQ}
        isLoading={isLoading}
        product_Id={productData?._id}
      />
      <BestSellers SimilarProductsData={SimilarProductsData} />
      {userData && !userData?.isSeller && <BecomeSeller />}
      <Footer />
    </div>
  );
};

export default ProductDetails;
