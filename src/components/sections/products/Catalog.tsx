import { Heart } from "../../icons";

interface CategoryProps {
  id: number;
  name: string;
  tag: string;
}

interface ProductItemProps {
  id: number;
  type: string;
  category: string;
  img: string;
  weight: string;
  desc: string;
  price: string;
}

const Catalog = () => {
  const categories: CategoryProps[] = [
    { id: 1, name: "Agege Bread", tag: "Agege" },
    { id: 2, name: "Sardine Bread", tag: "Sardine" },
    { id: 3, name: "Coconut Bread", tag: "Coconut" },
  ];

  const products: ProductItemProps[] = [
    {
      id: 1,
      type: "Family Loaf",
      category: "Agege Bread",
      img: "/assets/products/img_two.jpeg",
      weight: "800g",
      desc: "Soft, fluffy and perfect for any meal",
      price: "4",
    },
    {
      id: 2,
      type: "Jumbo Loaf",
      category: "Agege Bread",
      img: "/assets/products/img_one.png",
      weight: "1000g",
      desc: "Soft, fluffy and perfect for any meal",
      price: "4.5",
    },
    {
      id: 3,
      type: "Family loaf",
      category: "Sardine Bread",
      img: "/assets/products/img_three.jpeg",
      weight: "800g",
      desc: "A savory twist with rich sardines in every soft bite",
      price: "6",
    },
    {
      id: 4,
      type: "Family Loaf",
      category: "Coconut Bread",
      img: "/assets/products/img_four.png",
      weight: "700g",
      desc: "Soft and rich, with a delightful coconut essence",
      price: "6",
    },
  ];

  return (
    <div className="mt-6 space-y-8 pb-[15vh]">
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category === category.name
        );
        const gridCols = categoryProducts.length === 1 ? "grid-cols-1" : "grid-cols-2";
        return (
          <div key={category.id} className="flex flex-col space-y-3">
            <h2 className="font-bold">{category.name}</h2>
            <div className={`grid ${gridCols} gap-3`}>
              {categoryProducts.map((product) => (
                <div className="" key={product.id}>
                  <div className="bg-[#fff] border border-[#808080] shadow-lg w-[175px] rounded-md">
                    <img
                      src={product.img}
                      alt="img"
                      className="h-[117px] w-[100%] object-cover"
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
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Catalog;
