import { FC } from "react";
import { NavLink } from "react-router-dom";
import { DashboardIcon, OrderIcon, ProductsIcon } from "../icons";
import { AccountIcon } from "../../icons";

interface BottomNavProps {
  active: string;
}

interface ItemProps {
  id: number;
  name: string;
  icon: JSX.Element;
  route: string;
}

const AdminBottomNav: FC<BottomNavProps> = ({ active }) => {
  const items: ItemProps[] = [
    { id: 1, name: "Dashboard", icon: <DashboardIcon />, route: "/admin/dashboard" },
    { id: 2, name: "All Orders", icon: <OrderIcon />, route: "/admin/all-orders" },
    { id: 3, name: "Products", icon: <ProductsIcon />, route: "/admin/all-products" },
    { id: 4, name: "Account", icon: <AccountIcon />, route: "/admin-profile" },
  ];
  return (
    <div className="fixed bottom-0 w-[100%] lg:w-[450px] bg-[#fff] z-10">
      <div className="flex justify-between px-4 border-t-2 border-[#bdb08a] py-2 text-[15px]">
        {items.map((item) => (
          <NavLink to={item.route}
            key={item.id}
            className={`flex flex-col items-center text-[14px] space-y-1 transition-all duration-500 ease-in-out ${
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

export default AdminBottomNav;
