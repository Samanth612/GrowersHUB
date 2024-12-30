import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import MissionSection from "../components/MissionSection";
import JourneySection from "../components/JourneySection";
import Footer from "../components/Footer";
import Marketplace from "../components/Marketplace";
import MeetOurGardeners from "../components/MeetOurGardeners";
import BecomeSeller from "../components/BecomeSeller";
import ProductDetailsSection from "../components/ProductDetailsSection";
import { useSelector } from "react-redux";
import { CONFIG } from "../config";
import { store } from "../Store/store";
import SG1 from "../assets/SG1.jpg";
import axios from "axios";

const Home: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<any[]>([]);
  const [albumProducts, setAlbumProducts] = useState<any[]>([]);
  const [marketProducts, setMarketProducts] = useState<any[]>([]);
  const AuthReducer = useSelector((state: any) => state.auth);
  const userData = useSelector((state: any) => state.userData?.data || null);

  const fetchProducts = async () => {
    try {
      let response: Response;

      const headers: Record<string, string> = {
        "Cache-Control": "no-cache",
      };

      if (AuthReducer && userData?.access_token) {
        headers.Authorization = `Bearer ${userData.access_token}`;
      }

      response = await fetch(`${CONFIG?.API_ENDPOINT}/user/homepage`, {
        headers,
      });

      const data = await response.json();
      const albums = data.data?.albums || [];
      const products = data.data?.products || [];

      const transformedAlbumProducts = albums.map((album: any) => ({
        id: album._id,
        title: album.name || "Untitled Album",
        location: album.userDetails?.address || "Unknown Location",
        price: album.productsPrice,
        image: album.images?.[0] || "",
        profileImage: album.userDetails?.image || "",
        name: album.userDetails?.name || "",
        userId: album.userDetails?._id,
        isSeller: album.userDetails?.isSeller,
        isWishlisted: album?.isWishlisted,
        video: album?.video,
        products: album.images?.map((img: string) => ({ image: img })) || [],
      }));

      const transformedMarketProducts = products.map((product: any) => ({
        id: product._id,
        title: product.title || "Untitled Product",
        location: product.location || "Unknown Location",
        price: product.price,
        unitInfo: product.unitInfo,
        stock: product.stock,
        image: product.image,
        isWishlisted: product.isWishlisted,
        profileImage: product.userDetails?.image || SG1,
      }));

      setAlbumProducts(transformedAlbumProducts);
      setMarketProducts(transformedMarketProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${CONFIG?.API_ENDPOINT}/user/album/count`,
        {
          headers: {
            Authorization: `Bearer ${userData?.access_token}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      store.dispatch({
        type: "albumCount",
        payload: {
          data: response?.data?.data,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchDetails();
  }, [AuthReducer, userData]);

  return (
    <div className="font-jost">
      <Header />
      {selectedAlbum?.length > 0 ? (
        <ProductDetailsSection
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />
      ) : (
        <>
          <HeroSection />
          <MissionSection />
          <JourneySection />
          <MeetOurGardeners
            products={albumProducts || []}
            setSelectedAlbum={setSelectedAlbum}
          />
          <Marketplace products={marketProducts || []} />
        </>
      )}
      {userData && !userData?.isSeller && <BecomeSeller />}
      <Footer />
    </div>
  );
};

export default Home;
