import { FC, useEffect, useState } from "react";
import { Heart } from "../../icons";

interface CatalogProps {
  activeTab: string;
}

interface ProductItemProps {
  id: number;
  type: string;
  category: string;
  tag: string;
  img: string;
  weight: string;
  desc: string;
  price: string;
}

const Catalog: FC<CatalogProps> = ({ activeTab }) => {
  const [productsPerCategory, setProductsPerCategory] = useState<{
    [key: string]: ProductItemProps[];
  }>({});

  useEffect(() => {
    const products: ProductItemProps[] = [
      {
        id: 1,
        type: "Family Loaf",
        category: "Agege Bread",
        tag: "Agege",
        img: "/assets/products/img_two.jpeg",
        weight: "800g",
        desc: "Soft, fluffy and perfect for any meal",
        price: "4",
      },
      {
        id: 2,
        type: "Jumbo Loaf",
        category: "Agege Bread",
        tag: "Agege",
        img: "/assets/products/img_one.png",
        weight: "1000g",
        desc: "Soft, fluffy and perfect for any meal",
        price: "4.5",
      },
      {
        id: 3,
        type: "Family loaf",
        category: "Sardine Bread",
        tag: "Sardine",
        img: "/assets/products/img_three.jpeg",
        weight: "800g",
        desc: "A savory twist with rich sardines in every soft bite",
        price: "6",
      },
      {
        id: 4,
        type: "Family Loaf",
        category: "Coconut Bread",
        tag: "Coconut",
        img: "/assets/products/img_four.png",
        weight: "700g",
        desc: "Soft and rich, with a delightful coconut essence",
        price: "6",
      },
    ];

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
  }, [activeTab]);

  return (
    <div className="mt-6 space-y-8 pb-[15vh]">
      {Object.keys(productsPerCategory).map((category) => (
        <div key={category} className="space-y-3">
          <h2 className="font-bold">{category}</h2>
          <div className="grid grid-cols-2 gap-3">
            {productsPerCategory[category].map((product) => (
              <div
                key={product.id}
                className="bg-[#fff] border border-[#808080] shadow-md rounded-md"
              >
                <img
                  src={product.img}
                  alt="img"
                  className="w-[175px] h-[117px] object-cover"
                />
                <div className="p-3 text-[14px] space-y-3">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">{product.type}</h2>
                    <Heart />
                  </div>
                  <div className="flex justify-between">
                    <span className="italic">{product.weight}</span>
                    <span>${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
