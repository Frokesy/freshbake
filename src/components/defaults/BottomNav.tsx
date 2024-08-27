import { FC } from "react";
import { AccountIcon, CartIcon, HomeIcon, OrderIcon } from "../icons";
import { NavLink } from "react-router-dom";

interface BottomNavProps {
  active: string;
}

interface ItemProps {
  id: number;
  name: string;
  icon: JSX.Element;
  route: string;
}

const BottomNav: FC<BottomNavProps> = ({ active }) => {
  const items: ItemProps[] = [
    { id: 1, name: "Home", icon: <HomeIcon />, route: "/home" },
    { id: 2, name: "Cart", icon: <CartIcon />, route: "/cart" },
    { id: 3, name: "Orders", icon: <OrderIcon />, route: "/orders" },
    { id: 4, name: "Account", icon: <AccountIcon />, route: "/account" },
  ];
  return (
    <div className="fixed bottom-0 w-[100%] lg:w-[450px] bg-[#fff] z-10">
      <div className="flex justify-between px-4 border-t-2 border-[#bdb08a] py-2 text-[15px]">
        {items.map((item) => (
          <NavLink to={item.route}
            key={item.id}
            className={`flex flex-col items-center transition-all duration-500 ease-in-out ${
              active === item.name
                ? "text-[#7d6c3a] font-bold"
                : "text-[#5c501e]"
            }`}
          >
            <div>{item.icon}</div>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
