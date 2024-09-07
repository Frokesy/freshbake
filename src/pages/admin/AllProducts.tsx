import AdminContainer from "../../components/containers/AdminContainer";
import ProductsOverview from "../../components/admin/products/ProductsOverview";
import { useState } from "react";
import { motion } from "framer-motion";
import AddProduct from "../../components/admin/products/AddProduct";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const AllProducts = () => {
  const [activeTab, setActiveTab] = useState<string>("productOverview");
  return (
    <AdminContainer active="Products">
      {activeTab === "addProduct" ? (
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <AddProduct setActiveTab={setActiveTab} />
        </motion.div>
      ) : (
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <ProductsOverview setActiveTab={setActiveTab} />
        </motion.div>
      )}
    </AdminContainer>
  );
};

export default AllProducts;
