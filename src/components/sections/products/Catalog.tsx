import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "../../icons";
import ViewProductModal from "../../modals/ViewProductModal";
import { supabase } from "../../../../utils/supabaseClient";

interface CatalogProps {
  activeTab: string;
}

export interface ProductItemProps {
  id: number;
  type: string;
  category: string;
  tag: string;
  img: string;
  weight: string;
  desc: string;
  price: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Catalog: FC<CatalogProps> = ({ activeTab }) => {
  const [productsPerCategory, setProductsPerCategory] = useState<{
    [key: string]: ProductItemProps[];
  }>({});

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const [viewedProduct, setViewedProduct] = useState<ProductItemProps>();
  const [favoritedProducts, setFavoritedProducts] = useState<
    ProductItemProps[]
  >([]);

  const idb = window.indexedDB;
  const request = idb.open("freshbake", 1);
  request.onerror = (event) => {
    console.error("An error occurred with IndexedDB:", event);
  };

  request.onupgradeneeded = () => {
    const db = request.result;

    if (!db.objectStoreNames.contains("favorites")) {
      db.createObjectStore("favorites", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("cart")) {
      db.createObjectStore("cart", { keyPath: "id", autoIncrement: true});
    }
  };

  const handleLikedAnimation = (product: ProductItemProps) => {
    const isLiked = favoritedProducts.some((p) => p.id === product.id);
    const dbPromise = idb.open("freshbake", 1);

    if (isLiked) {
      setFavoritedProducts((prevFavoritedProducts) =>
        prevFavoritedProducts.filter((p) => p.id !== product.id)
      );

      dbPromise.onsuccess = function () {
        const db = dbPromise.result;
        const tx = db.transaction("favorites", "readwrite");
        const favorites = tx.objectStore("favorites");
        const deleteData = favorites.delete(product.id);

        deleteData.onsuccess = () => {
          tx.oncomplete = function () {
            db.close();
          };
        };
      };
    } else {
      setFavoritedProducts((prevFavoritedProducts) => [
        ...prevFavoritedProducts,
        product,
      ]);

      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const tx = db.transaction("favorites", "readwrite");
        const favorites = tx.objectStore("favorites");
        const addData = favorites.put(product);

        addData.onsuccess = () => {
          tx.oncomplete = () => {
            db.close();
          };
        };
      };
    }
  };

  const handleClick = (product: ProductItemProps) => {
    setViewedProduct(product);
    setOpenModal(true);
  };

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
  useEffect(() => {
    const filteredProducts = products.reduce(
      (acc: { [key: string]: ProductItemProps[] }, product) => {
        if (activeTab === "All" || product.tag === activeTab) {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
        }
        return acc;
      },
      {}
    );

    setProductsPerCategory(filteredProducts);
  }, [activeTab, products]);

  return (
    <div className="">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
        className="mt-6 space-y-8 pb-[15vh]"
      >
        {Object.keys(productsPerCategory).map((category) => (
          <motion.div
            key={category}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-3"
          >
            <h2 className="font-bold">{category}</h2>
            <div className="grid grid-cols-2 gap-3">
              {productsPerCategory[category].map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  onClick={() => handleClick(product)}
                  className="bg-[#fff] border border-[#808080] shadow-md rounded-md"
                >
                  <img
                    src={product.img}
                    alt="img"
                    className="w-[100%] h-[117px] object-cover"
                  />
                  <div className="p-3 text-[14px] space-y-3">
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold">{product.type}</h2>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikedAnimation(product);
                        }}
                        className="cursor-pointer transition-colors duration-500 ease-in-out"
                      >
                        <Heart
                          liked={favoritedProducts.some(
                            (p) => p.id === product.id
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="italic">{product.weight}</span>
                      <span>${product.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {openModal && (
          <ViewProductModal
            setOpenModal={setOpenModal}
            viewedProduct={viewedProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;
