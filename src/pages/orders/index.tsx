import MainContainer from "../../components/containers/MainContainer";
import { ArrowLeft } from "../../components/icons";

interface OrderItemProps {
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
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <div className="bg-[#ccc] p-1.5 rounded-full">
            <ArrowLeft />
          </div>
        </div>
        <h2 className="font-semibold text-[24px]">Orders</h2>
      </div>

      <div className="space-y-6 mt-10">
        {orderItems.map((item) => (
          <div className="space-y-3 text-[14px] px-4" key={item.id}>
            <div className="flex justify-between">
              <h2 className="font-semibold">
                {item.type} - {item.weight} {item.category}
              </h2>
              <p className="text-[12px]">Order {item.orderNo}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[12px]">{item.orderDate}</p>
              <p
                className={`${
                  item.orderStatus === "Pending" && "text-[#F55B0A]"
                } ${item.orderStatus === "Completed" && "text-[#005246]"} ${
                  item.orderStatus === "Failed" && "text-[#FF0000]"
                } text-[12px]`}
              >
                {item.orderStatus}
              </p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </MainContainer>
  );
};

export default Orders;
