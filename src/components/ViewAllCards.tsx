import React from "react";

interface Product {
  title: string;
  image: string;
}

interface ViewAllCardsProps {
  product: Product;
}

const ViewAllCards: React.FC<ViewAllCardsProps> = ({ product }) => {
  return (
    <div className="relative w-full max-w-96 rounded-lg overflow-hidden bg-white">
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden">
          {/* Single Image Display */}
          <div className="w-full h-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllCards;
