import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import ProductFilterBar from "./ProductFilters";
import AllSellers from "./AllSellers";
import BecomeSeller from "../BecomeSeller";
import Title from "../Title";
import { useSelector } from "react-redux";
import axios from "axios";
import { CONFIG } from "../../config";

const Products: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("Popularity");
  const userData = useSelector((state: any) => state.userData.data);
  const [totalProducts, setTotalProducts] = useState(0);
  const AuthReducer = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const headers: Record<string, string> = {
          "Cache-Control": "no-cache",
        };

        if (AuthReducer && userData?.access_token) {
          headers.Authorization = `Bearer ${userData.access_token}`;
        }

        const response = await fetch(
          `${CONFIG?.API_ENDPOINT}/${AuthReducer ? "seller" : "user"}${
            AuthReducer ? "/products/categories" : "/categories"
          }`,
          { headers }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const allCategories = Array.isArray(data?.data)
          ? data.data.map((cat: any) => ({
              _id: cat._id,
              categoryName: cat.categoryName,
            }))
          : [];

        allCategories.unshift({ _id: "all", categoryName: "All" });

        setSelectedCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [userData, AuthReducer]);

  return (
    <div>
      <Header />
      <Title
        title={"Marketplace"}
        description={"Find the perfect plant for your space"}
      />
      <ProductFilterBar
        selectedCategories={selectedCategories}
        setSelectedFilter={setSelectedFilter}
        setSortBy={setSortBy}
        selectedFilter={selectedFilter}
        sortBy={sortBy}
        totalProducts={totalProducts}
      />
      <AllSellers
        selectedFilter={selectedFilter}
        sortBy={sortBy}
        setTotalProducts={setTotalProducts}
      />
      {userData && !userData?.isSeller && <BecomeSeller />}
      <Footer />
    </div>
  );
};

export default Products;
