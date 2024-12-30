import React, { useEffect, useState } from "react";
import JP1 from "../assets/JP1.jpg";
import JP2 from "../assets/JP2.jpg";
import JP3 from "../assets/JP3.jpg";
import JP4 from "../assets/JP4.jpg";
import SG1 from "../assets/SG1.jpg";
import Icons from "../Utilities/Icons";
import Pagination from "../Utilities/Pagination";
import { ArrowLeft } from "lucide-react";
import CarouselCard from "../Utilities/CarouselCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CONFIG } from "../config";
import { useSelector } from "react-redux";
import { store } from "../Store/store";
import { INBOX, LOGIN } from "../Utilities/constantLinks";
import toast from "react-hot-toast";

// Interfaces for type safety
interface Product {
  title: string;
  location: string;
  price: string;
  unitInfo?: string;
  stock?: string;
  image: string;
  profileImage: string;
  name: string;
  isSeller?: any;
  products: { image: string }[];
  userId: string;
}

interface ViewSellersCardProps {
  setSelectedAlbum: (album: any) => void;
}

const ViewSellersCard: React.FC<ViewSellersCardProps> = ({
  setSelectedAlbum,
}) => {
  // States
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productLength, setProductLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state: any) => state.userData.data);
  const AuthReducer = useSelector((state: any) => state.auth);
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");

  useEffect(() => {
    if (window?.innerWidth < 1490 && window?.innerWidth >= 1000) {
      setItemsPerPage(9);
    } else {
      setItemsPerPage(8);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const skip = (currentPage - 1) * itemsPerPage;

      try {
        setLoading(true);

        const headers: Record<string, string> = {
          "Cache-Control": "no-cache",
        };

        if (AuthReducer && userData?.access_token) {
          headers.Authorization = `Bearer ${userData.access_token}`;
        }

        const response = await axios.get(
          `${CONFIG?.API_ENDPOINT}/user/album/user/${productId}?skip=${skip}&limit=${itemsPerPage}`,
          { headers }
        );

        if (response.data.status) {
          const transformedProducts = response.data.data.data.map(
            (album: any) => ({
              id: album._id,
              title: album.name,
              location: album.userDetails.address,
              price: album.price,
              unitInfo: album.unitInfo,
              stock: album.stock,
              image: album.images[0] || "",
              profileImage: album.userDetails.image || SG1,
              name: album.userDetails.name,
              isSeller: album.userDetails.isSeller,
              isWishlisted: album?.isWishlisted,
              video: album?.video,
              userId: album.userDetails._id,
              products: album.images.map((img: string) => ({ image: img })),
            })
          );

          setProducts(transformedProducts);
          setProductLength(
            response.data.data.totalCount || transformedProducts.length
          );
        } else {
          setProducts([]);
          setProductLength(0);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userData, currentPage, itemsPerPage, productId]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[40rem]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-12 py-12 bg-white">
      {/* Back Button */}
      <button
        className="flex items-center text-secondary mb-6 sm:mb-12 gap-3"
        onClick={() => {
          scrollTo(0, 0);
          navigate(-1);
        }}
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span className="font-semibold">Back</span>
      </button>

      {/* Seller Info */}
      <div className="flex flex-col">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={products[0]?.profileImage || SG1}
                alt={"Gardener"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4 flex flex-col gap-2">
              {products[0]?.isSeller && (
                <div className="flex items-center justify-center w-32 rounded-[4px] py-1 gap-2 bg-premiumgreen">
                  <Icons variant="SuperGrow" />
                  <span className="text-sm text-primary font-medium">
                    Super Grower
                  </span>
                </div>
              )}
              <p className="text-2xl font-semibold">
                {products[0]?.name || "Eko Susiloanto"}
              </p>
            </div>
          </div>
          <button
            className="text-sm rounded-lg bg-primary px-12 font-semibold py-2 text-white hover:bg-green-500"
            onClick={() => {
              if (!AuthReducer) {
                scrollTo(0, 0);
                navigate(LOGIN);
                return;
              }

              const userId = products[0].userId;

              axios
                .post(
                  `${CONFIG?.CHAT_BASE_URL}/chat/join`,
                  { id: userId, type: "User" },
                  {
                    headers: {
                      Authorization: `Bearer ${userData?.access_token}`,
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  store.dispatch({
                    type: "chatRoomId",
                    payload: {
                      data: res?.data?.data?.chatRoomId,
                    },
                  });
                  navigate(INBOX, { state: res?.data?.data?.chatRoomId });
                })
                .catch((err: any) => toast.error(err?.response?.data?.message));
            }}
          >
            Connect
          </button>
        </div>

        {/* Products Grid */}
        <div className="flex flex-col justify-between h-full">
          <div className="w-full transition-all duration-300 ease-in">
            {products.length === 0 ? (
              <div className="text-center text-xl font-semibold h-96 flex items-center justify-center text-gray-500">
                No albums available
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 pb-4 mb-10 tabsm:grid-cols-2 tabxll:grid-cols-3 xl:grid-cols-4">
                {products.map((product, index) => (
                  <div
                    className="flex items-center justify-center tabsm:justify-start sm:items-start"
                    key={index}
                  >
                    <CarouselCard
                      {...product}
                      setSelectedAlbum={setSelectedAlbum}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {products.length > 0 && (
            <div className="flex flex-col items-start justify-start gap-3 py-4">
              <Pagination
                id={"type2"}
                currentPage={currentPage}
                totalPages={Math.ceil(productLength / itemsPerPage)}
                onPageChange={handlePageChange}
                displayRange={3}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSellersCard;
