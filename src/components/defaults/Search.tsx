import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hamburger, SearchIcon } from "../icons";
import { supabase } from "../../../utils/supabaseClient";
import { ProductItemProps } from "../sections/products/Catalog";
import ViewProductModal from "../modals/ViewProductModal";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<ProductItemProps[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductItemProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      const { data, error } = await supabase
        .from("product-catalog")
        .select("*")
        .ilike("type", `%${searchTerm}%`);

      if (error) {
        console.error("Error fetching search results:", error.message);
      } else {
        setResults(data || []);
      }
    } else {
      setResults([]);
    }
  };

  const handleProductClick = (product: ProductItemProps) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mt-4 flex items-center p-3 justify-between border border-[#ccc] rounded-md shadow-md">
        <div className="flex items-center w-[90%] space-x-3">
          <SearchIcon />
          <input
            type="text"
            className="bg-inherit outline-none border-none text-[14px] w-[100%]"
            placeholder="search for your favorite bread today"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <Hamburger />
      </div>

      <div className="mt-4">
        {results.length > 0 ? (
          <AnimatePresence>
            <ul>
              {results.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-2 border-b border-[#ccc] last:border-none cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.img}
                      alt="img"
                      className="h-8 w-8 object-cover rounded-md"
                    />
                    <div className="">
                      <h2 className="font-semibold text-[14px]">
                        {product.type} {product.category} - {product.weight}
                      </h2>
                      <p className="text-gray-700 text-[12px]">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </ul>
          </AnimatePresence>
        ) : (
          <div>
            {results.length === 0 && searchTerm.length !== 0 && (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <ViewProductModal
            viewedProduct={selectedProduct}
            setOpenModal={setIsModalOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
