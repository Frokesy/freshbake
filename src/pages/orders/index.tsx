import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

//
import MainContainer from "../../components/containers/MainContainer";
import OrderDetails from "../../components/sections/orders/OrderDetails";
import OrderOverview from "../../components/sections/orders/OrderOverview";
import { supabase } from "../../../utils/supabaseClient";

export interface OrderItemProps {
  id: number;
  created_at: string;
  deliveryFee: string;
  deliveryOption: string;
  items: ItemProps[];
  orderStatus: string;
  paymentStatus: string;
  totalCost: string;
  transactionId: number;
  userId: string;
}

interface ItemProps {
  id: number;
  category: string;
  type: string;
  tag: string;
  img: string;
  weight: string;
  price: string;
  deliveryDay: string;
  deliveryTime: string;
  quantity: number;
  totalCost: number;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Orders = () => {
  const [clickedOrder, setClickedOrder] = useState<OrderItemProps>();

  const [orderItems, setOrderItems] = useState<OrderItemProps[]>();
  useEffect(() => {
    const getOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
      if (!error) {
         setOrderItems(data);
      } else {
        console.log(error);
      }
    };
    getOrder();
  }, []);
  return (
    <AnimatePresence mode="wait">
      <MainContainer active="Orders">
        {clickedOrder ? (
          <motion.div
            key={`details-${clickedOrder.id}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <OrderDetails
              clickedOrder={clickedOrder}
              setClickedOrder={setClickedOrder}
            />
          </motion.div>
        ) : (
          <motion.div
            key={"overview"}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <OrderOverview
              orderItems={orderItems}
              setClickedOrder={setClickedOrder}
            />
          </motion.div>
        )}
      </MainContainer>
    </AnimatePresence>
  );
};

export default Orders;
