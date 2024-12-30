import React, { useEffect, useState } from "react";
import Header from "../Header";
import ProductListings from "./ProductListing";
import ListProduct from "./Listaproduct";
import FAQsSection from "./FAQsSection";
import { store } from "../../Store/store";
import Dashboard from "../../Pages/Dashboard";

interface UploadedFile {
  file: File;
  preview: string;
}

const SellersDashboardLayout: React.FC = () => {
  const [uploadButtonClicked, setuploadButtonClicked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [FaqSection, setFaqSection] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [existingImageLinks, setExistingImageLinks] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<any[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [unitsForSale, setUnitsForSale] = useState<number>(5);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [selectedCategories, setSelectedCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);
  const [availableCategories, setAvailableCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);
  const [isChecked, setIsChecked] = useState(false);

  const resetState = () => {
    setUploadedFiles([]);
    setExistingImageLinks([]);
    setImageFiles([]);
    setProductName("");
    setProductDescription("");
    setUnitsForSale(5);
    setPricePerUnit(0);
    setSelectedCategories([]);
    setAvailableCategories([]);
    setIsChecked(false);
  };

  return (
    <div>
      <Header />
      <Dashboard>
        {FaqSection ? (
          <FAQsSection
            editing={editing}
            setuploadButtonClicked={setuploadButtonClicked}
            setFaqSection={setFaqSection}
          />
        ) : uploadButtonClicked ? (
          <ListProduct
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            existingImageLinks={existingImageLinks}
            setExistingImageLinks={setExistingImageLinks}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            productName={productName}
            setProductName={setProductName}
            productDescription={productDescription}
            setProductDescription={setProductDescription}
            unitsForSale={unitsForSale}
            setUnitsForSale={setUnitsForSale}
            pricePerUnit={pricePerUnit}
            setPricePerUnit={setPricePerUnit}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            availableCategories={availableCategories}
            setAvailableCategories={setAvailableCategories}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            setuploadButtonClicked={setuploadButtonClicked}
            editing={editing}
            setFaqSection={setFaqSection}
          />
        ) : (
          <ProductListings
            setuploadButtonClicked={(value: any) => {
              resetState();
              store.dispatch({
                type: "faqsData",
                payload: {
                  data: [],
                },
              });
              setuploadButtonClicked(value);
            }}
            setEditing={setEditing}
          />
        )}
      </Dashboard>
    </div>
  );
};

export default SellersDashboardLayout;
