import AdminContainer from "../../components/containers/AdminContainer";
import ProductsOverview from "../../components/admin/products/ProductsOverview";
import { useState } from "react";
import AddProduct from "../../components/admin/products/AddProduct";

const AllProducts = () => {
  const [activeTab, setActiveTab] = useState<string>("productOverview");
  return (
    <AdminContainer active="Products">
      {activeTab === "addProduct" ? (
        <AddProduct />
      ) : (
        <ProductsOverview setActiveTab={setActiveTab} />
      )}
    </AdminContainer>
  );
};

export default AllProducts;
