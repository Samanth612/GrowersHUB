import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import BecomeSeller from "../BecomeSeller";
import Title from "../Title";
import ProductFilterBar from "../Products/ProductFilters";
import CommunityDetails from "./CommunityDetails";
import CommunityRBAC from "./CommunityRBAC";
import ProductDetailsSection from "../ProductDetailsSection";
import { useSelector } from "react-redux";
import axios from "axios";
import { CONFIG } from "../../config";

const CommunityLayout: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const userData = useSelector((state: any) => state.userData?.data || null);
  const AuthReducer = useSelector((state: any) => state.auth);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);

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
      {selectedAlbum?.length > 0 ? (
        <ProductDetailsSection
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />
      ) : (
        <>
          <Title
            title={"Community"}
            description={"Meet Fellow gardeners and share your journey"}
          />
          <CommunityRBAC />
          <ProductFilterBar
            selectedCategories={selectedCategories}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
          <CommunityDetails
            setSelectedAlbum={setSelectedAlbum}
            selectedFilter={selectedFilter}
          />
        </>
      )}

      {userData && !userData?.isSeller && <BecomeSeller />}
      <Footer />
    </div>
  );
};

export default CommunityLayout;
