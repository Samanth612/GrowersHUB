import React, { useEffect, useState } from "react";
import Header from "../Header";
import Dashboard from "../Chat/Dashboard";
import YourAlbum from "./YourAlbum";
import axios from "axios";
import { useSelector } from "react-redux";

const YourAlbumLayout: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productLength, setProductLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [refreshKey, setRefreshKey] = useState(0);

  const userData = useSelector((state: any) => state.userData.data);

  useEffect(() => {
    if (window?.innerWidth < 1490 && window?.innerWidth >= 1000) {
      setItemsPerPage(9);
    } else {
      setItemsPerPage(8);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const skip = currentPage - 1;
      const limit = itemsPerPage;
      try {
        setLoading(true);

        const response = await axios.get(
          `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/user/album/?skip=${skip}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${userData?.access_token}`,
              "Cache-Control": "no-cache",
            },
          }
        );

        if (response?.data?.status) {
          const fetchedProducts = response?.data?.data?.data || [];

          const transformedProducts = fetchedProducts?.map((product: any) => ({
            title: product.name,
            image: product.images || "",
            id: product._id,
          }));

          setProducts(transformedProducts);
          setProductLength(response?.data?.data?.total);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error as any);
        setProducts([]); // Clear products in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userData, currentPage, itemsPerPage, refreshKey]); // Added refreshKey as a dependency

  const handleDelete = async (productId: any) => {
    try {
      const response = await axios.post(
        `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/user/album/delete/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      const deletedId = response?.data?.data?._id;
      if (deletedId) {
        setProducts((prevList) =>
          prevList.filter((product) => product.id !== deletedId)
        );
        setRefreshKey((prevKey) => prevKey + 1); // Trigger refresh
      }
    } catch (error) {
      console.error("Failed to delete product:", error as any);
    }
  };

  return (
    <div>
      <Header />
      <Dashboard>
        <YourAlbum
          products={products}
          productLength={productLength}
          loading={loading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          handleDelete={handleDelete}
        />
      </Dashboard>
    </div>
  );
};

export default YourAlbumLayout;
