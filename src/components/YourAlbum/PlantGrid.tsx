import React, { useEffect, useState } from "react";
import Pagination from "../../Utilities/Pagination";
import PlantCard from "./PlantCard";
import CreateAlbum from "../CreateAlbum/CreateAlbum";

interface PlantGridProps {
  setSplitCards: any;
  setCardName: any;
  setProductCards?: any;
  setProductLength?: any;
  products: any[];
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  handleDelete: any;
  productLength: any;
}

const PlantGrid: React.FC<PlantGridProps> = ({
  setSplitCards,
  setCardName,
  setProductCards,
  products,
  loading,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  handleDelete,
  productLength,
}) => {
  const [currentProductsList, setCurrentProducts] = useState<any[]>([]);
  const currentProducts = currentProductsList;

  useEffect(() => {
    setCurrentProducts(products);
  }, [products?.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {currentProducts?.length > 0 ? (
        <div className="px-6 lg:px-12 py-12 bg-white">
          <div className="flex flex-col justify-between h-full">
            <div className="w-full transition-all duration-300 ease-in ">
              <div className="grid grid-cols-1 gap-5 pb-4 mb-10 tabsm:grid-cols-2 tabxll:grid-cols-3 xl:grid-cols-4">
                {currentProducts?.map((product, index) => (
                  <div
                    className="flex items-center justify-center tabsm:justify-start sm:items-start"
                    key={index}
                  >
                    <PlantCard
                      title={product?.title}
                      setSplitCards={setSplitCards}
                      setCardName={setCardName}
                      products={product?.image}
                      setProductCards={setProductCards}
                      id={product?.id}
                      handleDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-3 py-4">
              <Pagination
                id={"type2"}
                currentPage={currentPage}
                totalPages={Math.ceil(productLength / itemsPerPage)}
                onPageChange={setCurrentPage}
                displayRange={3}
              />
            </div>
          </div>
        </div>
      ) : (
        <CreateAlbum />
      )}
    </>
  );
};

export default PlantGrid;
