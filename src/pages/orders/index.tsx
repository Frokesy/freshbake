import { useState } from "react";
import MainContainer from "../../components/containers/MainContainer";
import OrderDetails from "./OrderDetails";
import OrderOverview from "./OrderOverview";

export interface OrderItemProps {
  id: number;
  type: string;
  category: string;
  tag: string;
  img: string;
  weight: string;
  desc: string;
  price: string;
  orderNo: number;
  orderStatus: string;
  orderDate: string;
}

const Orders = () => {
  const [clickedOrder, setClickedOrder] = useState<OrderItemProps>();
  const orderItems: OrderItemProps[] = [
    {
      id: 1,
      type: "Family Loaf",
      category: "Agege Bread",
      tag: "Agege",
      img: "/assets/products/img_two.jpeg",
      weight: "800g",
      desc: "Soft, fluffy and perfect for any meal",
      price: "4",
      orderNo: 18245,
      orderStatus: "Pending",
      orderDate: "16th Aug 2024. 12:15",
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
      orderNo: 32346,
      orderStatus: "Completed",
      orderDate: "6th Aug 2024. 17:45",
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
      orderNo: 13945,
      orderStatus: "Failed",
      orderDate: "16th Aug 2024. 00:15",
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
      orderNo: 12315,
      orderStatus: "Pending",
      orderDate: "26th Aug 2024. 12:00",
    },
  ];
  return (
    <MainContainer active="Orders">
      {clickedOrder ? (
        <OrderDetails
          clickedOrder={clickedOrder}
          setClickedOrder={setClickedOrder}
        />
      ) : (
        <OrderOverview
          orderItems={orderItems}
          setClickedOrder={setClickedOrder}
        />
      )}
    </MainContainer>
  );
};

export default Orders;
