import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import JP1 from "../../assets/JP1.jpg";
import JP2 from "../../assets/JP2.jpg";
import JP3 from "../../assets/JP3.jpg";
import JP4 from "../../assets/JP4.jpg";
import Pagination from "../../Utilities/Pagination";
import axios from "axios";
import { useSelector } from "react-redux";

const AllSellers: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const userData = useSelector((state: any) => state.userData.data);

  // Calculate the displayed products for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

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

        const response = await axios.get(
          `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/user/products?skip=${skip}&limit=${limit}&sortBy=price`,
          {
            headers: {
              Authorization: `Bearer ${userData?.access_token}`,
              "Cache-Control": "no-cache",
            },
          }
        );

        if (response?.data?.status) {
          const fetchedProducts = response?.data?.data?.data || [];

          const transformedProducts = fetchedProducts.map((product: any) => ({
            title: product.title,
            location: product.location,
            price: product.price,
            unitInfo: `${product.unitInfo} units`,
            stock:
              product.stock > 0
                ? `${product.stock} units left`
                : "Out of stock",
            image: product.images || "",
            isSeller: product.isSeller,
            isWishlisted: product.isWishlisted,
            id: product._id,
          }));

          setProducts(transformedProducts);
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
  }, [userData?.access_token]);

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
        <div className="flex flex-col items-start justify-start gap-3 py-4">
          <Pagination
            id={"type2"}
            currentPage={currentPage}
            totalPages={Math.ceil(products.length / itemsPerPage)}
            onPageChange={handlePageChange}
            displayRange={3}
          />
        </div>
      </div>
    </div>
  );
};

export default AllSellers;
