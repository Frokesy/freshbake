import { NavLink } from "react-router-dom";
import MainContainer from "../../components/containers/MainContainer";
import Button from "../../components/defaults/Button";
import { ArrowLeft, DeleteIcon } from "../../components/icons";
import { useEffect, useState } from "react";

interface CartItemProps {
  id: number;
  type: string;
  category: string;
  tag: string;
  img: string;
  weight: string;
  desc: string;
  price: string;
  deliveryDay: string;
  deliveryTime: string;
  quantity: number;
  totalCost: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  const idb = window.indexedDB;

  useEffect(() => {
    const getCartItems = () => {
      const dbPromise = idb.open("freshbake", 1);
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        const tx = db.transaction("cart", "readonly");
        const cart = tx.objectStore("cart");
        const data = cart.getAll();

        data.onsuccess = (query) => {
          if (query.srcElement) {
            setCartItems((query.srcElement as IDBRequest).result);
          }
        };

        tx.oncomplete = function () {
          db.close();
        };
      };
    };
    getCartItems();
  }, [idb]);

  console.log(cartItems)

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
          {cartItems.map((product) => (
                <div
                  className="flex items-center justify-between border-b-2 pb-4 border-[#ccc]"
                  key={product.id}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={product.img}
                      alt={product.tag}
                      className="w-[52px] h-[52px] rounded-full"
                    />
                    <div className="space-y-2">
                      <h2 className="text-[16px]">{product.category}</h2>
                      <p className="text-[14px]">
                        {product.weight} {product.type}
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
