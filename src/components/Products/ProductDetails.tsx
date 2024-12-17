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

const ProductDetails: React.FC = () => {
  const [productData, setProductData] = useState<any>(null);
  const [SimilarProductsData, setSimilarProductsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state: any) => state.userData.data);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/user/products/${location?.state}`,
          {
            headers: {
              Authorization: `Bearer ${userData?.access_token}`,
              "Cache-Control": "no-cache",
            },
          }
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
  }, [userData?.access_token, location?.state]);

  return (
    <div>
      <Header />
      <Title title={"Product"} description={"Marble Queen Pothos"} />
      <Product productData={productData} isLoading={isLoading} />
      <FAQSection FAQSData={productData?.FAQ} isLoading={isLoading} />
      <BestSellers SimilarProductsData={SimilarProductsData} />
      <BecomeSeller />
      <Footer />
    </div>
  );
};

export default ProductDetails;
