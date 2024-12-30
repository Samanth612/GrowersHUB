import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import JP1 from "../../assets/JP1.jpg";
import JP2 from "../../assets/JP2.jpg";
import JP3 from "../../assets/JP3.jpg";
import JP4 from "../../assets/JP4.jpg";
import Pagination from "../../Utilities/Pagination";
import axios from "axios";
import { useSelector } from "react-redux";
import { CONFIG } from "../../config";

interface AllSellersprops {
  selectedFilter?: any;
  sortBy?: any;
  setTotalProducts?: any;
}

const AllSellers: React.FC<AllSellersprops> = ({
  selectedFilter,
  sortBy,
  setTotalProducts,
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [productLength, setProductLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const userData = useSelector((state: any) => state.userData.data);
  const AuthReducer = useSelector((state: any) => state.auth);

  const currentProducts = products;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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

        const headers: Record<string, string> = {
          "Cache-Control": "no-cache",
        };

        if (AuthReducer && userData?.access_token) {
          headers.Authorization = `Bearer ${userData.access_token}`;
        }

        const response = await axios.get(
          `${
            CONFIG?.API_ENDPOINT
          }/user/products?skip=${skip}&limit=${limit}&sortBy=${sortBy.toLowerCase()}&categoryId=${selectedFilter}`,

          { headers }
        );

        if (response?.data?.status) {
          const fetchedProducts = response?.data?.data?.data || [];

          const transformedProducts = fetchedProducts.map((product: any) => ({
            title: product.title,
            location: product.location,
            price: product.price,
            unitInfo: product.unitInfo,
            stock: product.stock,
            image: product.images || "",
            isSeller: product.isSeller,
            isWishlisted: product.isWishlisted,
            id: product._id,
          }));

          setProducts(transformedProducts);
          if (transformedProducts?.length > 0) {
            setProductLength(response.data.data.total);
            setTotalProducts(response.data.data.total);
          } else {
            setProductLength(0);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error as any);
        const products = [
          {
            title: "Crassula small leaf plant",
            location: "San Ramon, California, 20miles away",
            price: "122",
            unitInfo: "4 unit",
            stock: "2 units left",
            image: JP1,
          },
          {
            title: "Lemon",
            location: "San Ramon, California, 20miles away",
            price: "122",
            image: JP2,
          },
          {
            title: "Mint",
            location: "San Ramon, California, 20miles away",
            price: "122",
            image: JP3,
          },
          {
            title: "Betel leaf plants",
            location: "San Ramon, California, 20miles away",
            price: "122",
            unitInfo: "unit",
            stock: "1 Unit left",
            image: JP4,
          },
          {
            title: "Crassula small leaf plant (Repeat)",
            location: "San Ramon, California, 20miles away",
            price: "122",
            unitInfo: "4 unit",
            stock: "2 units left",
            image: JP1,
          },
          {
            title: "Lemon (Repeat)",
            location: "San Ramon, California, 20miles away",
            price: "122",
            image: JP2,
          },
          {
            title: "Lemon",
            location: "San Ramon, California, 20miles away",
            price: "122",
            image: JP2,
          },
          {
            title: "Mint",
            location: "San Ramon, California, 20miles away",
            price: "122",
            image: JP3,
          },
          {
            title: "Betel leaf plants",
            location: "San Ramon, California, 20miles away",
            price: "122",
            unitInfo: "unit",
            stock: "1 Unit left",
            image: JP4,
          },
          {
            title: "Crassula small leaf plant (Repeat)",
            location: "San Ramon, California, 20miles away",
            price: "122",
            unitInfo: "4 unit",
            stock: "2 units left",
            image: JP1,
          },
          {
            title: "Lemon (Repeat)",
            location: "San Ramon, California, 20miles away",
            price: "122",
            image: JP2,
          },
        ];
        setProducts(products);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userData?.access_token, currentPage, selectedFilter, sortBy]);

  return (
    <div className="px-6 lg:px-12 py-8 bg-white">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl tabmd:text-5xl font-semibold leading-normal">
          All Products
        </h1>
      </div>

      {/* Product Grid with Smooth Sliding */}
      <div className="flex flex-col justify-between h-full">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="w-full transition-all duration-300 ease-in ">
            <div className="grid grid-cols-1 gap-5 pb-4 mb-10 tabsm:grid-cols-2 tabxll:grid-cols-3 xl:grid-cols-4">
              {currentProducts.map((product, index) => (
                <div
                  className="flex items-center justify-center sm:justify-start sm:items-start"
                  key={index}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        )}
        {productLength > 0 ? (
          <div className="flex flex-col items-start justify-start gap-3 py-4">
            <Pagination
              id={"type2"}
              currentPage={currentPage}
              totalPages={Math.ceil(productLength / itemsPerPage)}
              onPageChange={handlePageChange}
              displayRange={3}
            />
          </div>
        ) : (
          <div className="text-xl text-center text-secondary font-semibold">
            No Products Available
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
