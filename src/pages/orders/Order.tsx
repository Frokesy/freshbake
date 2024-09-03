import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient";
import OrderDetails from "../../components/sections/orders/OrderDetails";
import { OrderItemProps } from ".";

const Order = () => {
  const { transactionId } = useParams();

  const [data, setData] = useState<OrderItemProps>();
  useEffect(() => {
    const getOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("transactionId", transactionId);
      if (!error) {
        data.map((data) => setData(data));
      } else {
        console.log(error);
      }
    };
    getOrder();
  }, [transactionId]);

  return (
    <div>
      <OrderDetails fromOrderPage clickedOrder={data as OrderItemProps} setClickedOrder={setData} />
    </div>
  );
};

export default Order;
