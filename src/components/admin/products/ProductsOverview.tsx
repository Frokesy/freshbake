import { toast, ToastContainer, Bounce } from "react-toastify"; // Import Toast for notifications
import { PlusIcon } from "../icons";
import { FC, useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabaseClient";
import { ProductItemProps } from "../../sections/products/Catalog";
import { NavLink } from "react-router-dom";
import { ArrowLeft, DeleteIcon } from "../../icons";
import ConfirmProductDeleteModal from "../../modals/ConfirmProductDeleteModal";
import EditProduct from "./EditProduct";

export interface ProductsOverviewProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const ProductsOverview: FC<ProductsOverviewProps> = ({ setActiveTab }) => {
  const [products, setProducts] = useState<ProductItemProps[]>();
  const [editedProduct, setEditedProduct] = useState<ProductItemProps | undefined>();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductItemProps | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from("product-catalog")
        .select("*");
      if (!error) {
        setProducts(data);
      } else {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handleDelete = async (product: ProductItemProps) => {
    setSelectedProduct(product);
    setOpenConfirmationModal(true);
  };

  const getResponse = async (response: string) => {
    setOpenConfirmationModal(false);

    if (response === "yes" && selectedProduct) {
      const { error } = await supabase
        .from("product-catalog")
        .delete()
        .eq("id", selectedProduct.id);

      if (error) {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product!", {
          position: "top-right",
          theme: "light",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        });
      } else {
        toast.success("Product deleted successfully!", {
          position: "top-right",
          theme: "light",
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        });

        setProducts((prevProducts) =>
          prevProducts?.filter((item) => item.id !== selectedProduct.id)
        );
      }
    }
    setSelectedProduct(null);
  };

  return (
    <div className="">
      {editedProduct === undefined ? (
        <div>
          <ToastContainer />
          <div className="flex items-center space-x-4 px-4 pt-10">
            <div className="flex">
              <NavLink
                to="/admin/dashboard"
                className="bg-[#ccc] p-1.5 rounded-full"
              >
                <ArrowLeft />
              </NavLink>
            </div>
            <h2 className="font-semibold text-[24px]">Products</h2>
          </div>

          <div className="bg-[#fff] flex justify-between items-center px-4 py-4 mt-6">
            <h2 className="text-[14px]">Add Product</h2>
            <div
              onClick={() => setActiveTab("addProduct")}
              className="bg-[#f9f3db] p-2 rounded-full"
            >
              <PlusIcon />
            </div>
          </div>

          <div className="mt-4 space-y-3 pb-[20vh]">
            {products?.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between px-4 py-4 bg-[#fff]"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={product.img}
                    alt={product.desc}
                    className="w-[52px] h-[52px] rounded-full object-cover"
                  />
                  <div className="space-y-2">
                    <h2 className="text-[16px]">{product.category}</h2>
                    <p className="text-[14px]">
                      {product.weight} {product.type}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 items-center flex flex-col">
                  <div
                    onClick={() => handleDelete(product)}
                    className="bg-[#fae0e2] p-2 rounded-full cursor-pointer"
                  >
                    <DeleteIcon />
                  </div>
                  <p
                    onClick={() => setEditedProduct(product)}
                    className="text-[14px]"
                  >
                    Edit
                  </p>
                </div>
              </div>
            ))}
          </div>

          {openConfirmationModal && (
            <ConfirmProductDeleteModal getResponse={getResponse} />
          )}
        </div>
      ) : (
        <div className="">
          <EditProduct
            setEditedProduct={setEditedProduct}
            editedProduct={editedProduct}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsOverview;
