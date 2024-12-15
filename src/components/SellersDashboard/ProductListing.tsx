import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../Utilities/Pagination";
import JP1 from "../../assets/JP1.jpg";
import JP2 from "../../assets/JP2.jpg";
import JP3 from "../../assets/JP3.jpg";
import JP4 from "../../assets/JP4.jpg";
import SG1 from "../../assets/SG1.jpg";
import SellersCard from "./SellersCard";
import { useSelector } from "react-redux";

interface MediaUploadProps {
  setuploadButtonClicked: any;
  setEditing: any;
}

const ProductListings: React.FC<MediaUploadProps> = ({
  setuploadButtonClicked,
  setEditing,
}) => {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const userData = useSelector((state: any) => state.userData.data);

  const staticProducts = [
    {
      title: "Crassula small leaf plant",
      location: "San Ramon, California",
      price: "122",
      unitInfo: "4 unit",
      stock: "2 units left",
      image: JP1,
      profileImage: SG1,
      name: "Joanna Wellick",
      categories: ["Succulent", "Indoor Plant", "Freshly Sourced"],
    },
    {
      title: "Lemon",
      location: "San Ramon, California",
      price: "122",
      image: JP2,
      profileImage: SG1,
      name: "Joanna Wellick",
      categories: ["Fruit", "Citrus", "Freshly Sourced"],
    },
    {
      title: "Mint",
      location: "San Ramon, California",
      price: "122",
      image: JP3,
      profileImage: SG1,
      name: "Joanna Wellick",
      categories: ["Herb", "Freshly Sourced"],
    },
    {
      title: "Betel leaf plants",
      location: "San Ramon, California",
      price: "122",
      unitInfo: "unit",
      stock: "1 Unit left",
      image: JP4,
      profileImage: SG1,
      name: "Joanna Wellick",
      categories: ["Indoor Plant", "Freshly Sourced"],
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Map filter to the server's expected status parameter
        const status =
          filter === "all"
            ? "All"
            : filter === "available"
            ? "Available"
            : "Sold";

        const response = await axios.get(
          `http://ec2-54-208-71-137.compute-1.amazonaws.com:4000/seller/products/?status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${userData?.access_token}`,
              "Cache-Control": "no-cache",
            },
          }
        );

        if (response.data.status) {
          const backendProducts = response.data.data.data.map(
            (product: any) => ({
              title: product.name,
              location: product.userDetails.address,
              price: product.price.toString(),
              stock:
                product.noOfUnitsSold > 0
                  ? `${product.noOfUnitsSold} sold`
                  : "Available",
              image: product.images[0],
              profileImage: product.userDetails.profileImage || "",
              name: product.userDetails.name,
              categories: product.categories,
              id: product._id,
            })
          );
          setProducts(backendProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error as any);
        setProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter, userData?.access_token]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categories.some((category: string) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesSearch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="text-center p-6 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto bg-white">
      <div className="flex flex-wrap items-center justify-between py-4 px-6 sm:px-12 border-b shadow-inner gap-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-10">
          <div className="flex">
            <h1 className="text-xl text-secondary font-semibold">
              Your Listings
            </h1>
            <span className="ml-2 bg-premiumgray text-secondary text-sm px-2 py-0.5 rounded-full">
              {filteredProducts.length}
            </span>
          </div>
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-[250px] sm:min-w-[320px] px-4 py-3 bg-premiumgray rounded-lg placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            {["all", "available", "sold out"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilterChange(filterType)}
                className={`px-4 py-1 rounded-md ${
                  filter === filterType
                    ? "text-primary font-medium bg-premiumgreen"
                    : "text-secondary border border-primary hover:bg-premiumgray"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="px-12 py-2 text-lg font-medium text-white bg-primary rounded-lg hover:bg-green-500 transition-colors"
            onClick={() => {
              setuploadButtonClicked(true);
              setEditing(false);
            }}
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-between h-full p-4 sm:p-10">
        <div className="w-full transition-all duration-300 ease-in">
          <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-4 gap-5 pb-4 mb-10">
            {currentProducts.map((product, index) => (
              <SellersCard
                key={index}
                product={product}
                setEditing={setEditing}
                setuploadButtonClicked={setuploadButtonClicked}
                removeProduct={(id: string) => {
                  setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.id !== id)
                  );
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 py-4">
          <Pagination
            id={"type2"}
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
            onPageChange={handlePageChange}
            displayRange={3}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListings;
