interface CategoryProps {
  id: number;
  name: string;
  tag: string;
}

interface ProductItemProps {
  id: number;
  type: string;
  category: string;
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
      weight: "800g",
      desc: "Soft, fluffy and perfect for any meal",
      price: "4",
    },
    {
      id: 2,
      type: "Jumbo Loaf",
      category: "Agege Bread",
      weight: "1000g",
      desc: "Soft, fluffy and perfect for any meal",
      price: "4.5",
    },
    {
      id: 3,
      type: "Family loaf",
      category: "Sardine Bread",
      weight: "800g",
      desc: "A savory twist with rich sardines in every soft bite",
      price: "6",
    },
    {
      id: 4,
      type: "Family Loaf",
      category: "Coconut Bread",
      weight: "700g",
      desc: "Soft and rich, with a delightful coconut essence",
      price: "6",
    },
  ];
  return (
    <div className="mt-4">
      {categories.map((category) => (
        <div key={category.id} className="">
          <h2>{category.name}</h2>
          <div className="">
            {products.map((product) => (
              <div className="" key={product.id}>
                {product.category === category.name && (
                  <div className="">
                    <h2>
                      {product.type} - {product.category}
                    </h2>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
