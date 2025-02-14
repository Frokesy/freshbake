import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetails from "../../components/sections/orders/OrderDetails";
import { OrderItemProps } from ".";
import { pb } from "../../../utils/pocketbaseClient";

const Order = () => {
  const { transactionId } = useParams();

  const [data, setData] = useState<OrderItemProps>();
  useEffect(() => {
    const getOrder = async () => {
      try {
        const data = await pb.collection("orders").getFullList({
          filter: `transactionId = "${transactionId}"`,
        });
  
        if (data.length > 0) {
          setData(data[0] as unknown as OrderItemProps); 
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
  
    if (transactionId) {
      getOrder();
    }
  }, [transactionId]);
  
  return (
    <div>
      <OrderDetails fromOrderPage clickedOrder={data as OrderItemProps} setClickedOrder={setData} />
    </div>
  );
};

export default Order;
