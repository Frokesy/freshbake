import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import Button from "../../components/defaults/Button";
import { ArrowLeft, DeleteIcon } from "../../components/icons";
import { ProductItemProps } from "../../components/sections/products/Catalog";

const Cart = () => {
  const cartItems: ProductItemProps[] = [
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
  ];

  return (
    <MainContainer active="Cart">
      <div className="px-4 pt-10">
        <div className="flex items-center space-x-4">
          <div className="flex">
            <div className="bg-[#ccc] p-1.5 rounded-full">
              <ArrowLeft />
            </div>
          </div>
          <h2 className="font-semibold text-[24px]">My Cart</h2>
        </div>

        <div className="mt-10 space-y-10">
          {cartItems.map((item) => (
            <div
              className="flex items-center justify-between border-b-2 pb-4 border-[#ccc]"
              key={item.id}
            >
              <div className="flex items-center space-x-6">
                <img
                  src={item.img}
                  alt={item.tag}
                  className="w-[52px] h-[52px] rounded-full"
                />
                <div className="space-y-2">
                  <h2 className="text-[16px]">{item.category}</h2>
                  <p className="text-[14px]">
                    {item.weight} {item.type}
                  </p>
                </div>
              </div>

              <div className="bg-[#fae0e2] p-2 rounded-full">
                <DeleteIcon />
              </div>
            </div>
          ))}
          <div className="pt-10 pb-[20vh]">
            <NavLink to="/checkout">
              <Button filled content="Checkout" />
            </NavLink>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Cart;
