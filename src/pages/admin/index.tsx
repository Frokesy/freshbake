import { useEffect, useState } from "react";
import Graph from "../../components/admin/defaults/Chart";
import { OrderIcon } from "../../components/admin/icons";
import AdminContainer from "../../components/containers/AdminContainer";
import { OrderItemProps } from "../orders";
import { supabase } from "../../../utils/supabaseClient";

const AdminDashboard = () => {
  const [orderItems, setOrderItems] = useState<OrderItemProps[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [processingPercentage, setProcessingPercentage] = useState<number>(0);
  const [outForDeliveryPercentage, setOutForDeliveryPercentage] = useState<number>(0);
  const [deliveredPercentage, setDeliveredPercentage] = useState<number>(0);

  
  const calculateMetrics = (orders: OrderItemProps[]) => {
    const totalOrders = orders.length;

    const totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.totalCost) || 0), 0);
    setTotalRevenue(totalRevenue);

    const processingOrders = orders.filter((order) => order.orderStatus === "Processing").length;
    const outForDeliveryOrders = orders.filter((order) => order.orderStatus === "Out for Delivery").length;
    const delivered = orders.filter((order) => order.orderStatus === "Delivered").length;

    setProcessingPercentage((processingOrders / totalOrders) * 100);
    setDeliveredPercentage((outForDeliveryOrders / totalOrders) * 100);
    setOutForDeliveryPercentage((delivered / totalOrders) * 100);
  };
  
  useEffect(() => {
    const getOrders = async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        console.error(error);
      } else {
        setOrderItems(data);
        calculateMetrics(data);
      }
    };
    getOrders();
  }, []);

  return (
    <AdminContainer active="Dashboard">
      <div className="pt-10 px-4">
        <h2 className="font-semibold text-[18px]">My Dashboard</h2>

        <div className="mt-6 flex justify-between w-[100%] space-x-3">
          <div className="w-[50%] bg-[#fff] rounded-lg p-3 shadow-lg flex items-center justify-between">
            <div className="flex flex-col items-center">
              <h2 className="text-[20px] font-semibold">{orderItems.length}</h2>
              <p className="text-[12px]">Total Orders</p>
            </div>
            <div className="py-1 px-1 border-4 border-t-[#bd9e1e] border-r-[#bd9e1e] border-b-[#bd9e1e] border-l-[#fff] flex items-center rounded-full">
              <div className="bg-[#7d6c3a] w-[40px] h-[40px] flex items-center justify-center rounded-full">
                <OrderIcon color="#fff" size="18" />
              </div>
            </div>
          </div>

          <div className="w-[50%] bg-[#fff] rounded-lg p-3 shadow-lg flex items-center justify-between">
            <div className="flex flex-col items-center">
              <h2 className="text-[20px] font-semibold">N{totalRevenue.toLocaleString()}</h2>
              <p className="text-[12px]">Total Revenue</p>
            </div>
            <div className="py-1 px-1 relative border-4 border-t-[#bd9e1e] border-b-[#bd9e1e] border-r-[#bd9e1e] border-l-[#fafafa] rounded-full flex items-center">
              <div className="bg-[#7d6c3a] w-[40px] h-[40px] flex items-center justify-center rounded-full">
                <OrderIcon color="#fff" size="18" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fff] rounded-lg p-3 mt-6 shadow-md">
          <h2 className="font-semibold text-[16px]">Order Summary</h2>

          <div className="flex justify-between mt-3">
          <div className="flex flex-col items-center">
          <div className="py-1 px-1 relative border-8 border-t-[#7d6c3a] border-b-[#7d6c3a] -rotate-45 border-r-[#bd9e1e] border-l-[#7d6c3a] rounded-full flex items-center">
                <div className="bg-[#fff] rotate-45 w-[60px] h-[60px] flex items-center justify-center rounded-full">
                  <h2>{processingPercentage.toFixed(2)}%</h2>
                </div>
              </div>
              <h2 className="text-[15px] text-center font-semibold mt-2">Processing</h2>
            </div>

            <div className="flex flex-col items-center">
              <div className="py-1 px-1 relative border-8 border-t-[#bd9e1e] rotate-45 border-b-[#bd9e1e] border-r-[#bd9e1e] border-l-[#7d6c3a] rounded-full flex items-center">
                <div className="bg-[#fff] -rotate-45 w-[60px] h-[60px] flex items-center justify-center rounded-full">
                  <h2>{deliveredPercentage.toFixed(2)}%</h2>
                </div>
              </div>
              <h2 className="text-[15px] text-center font-semibold mt-2">Out for Delivery</h2>
            </div>

            <div className="flex flex-col items-center">
              <div className="py-1 px-1 relative border-8 border-t-[#bd9e1e] border-b-[#7d6c3a] rotate-45 border-r-[#bd9e1e] border-l-[#7d6c3a] rounded-full flex items-center">
                <div className="bg-[#fff] w-[60px] h-[60px] flex items-center justify-center rounded-full -rotate-45">
                  <h2>{outForDeliveryPercentage.toFixed(2)}%</h2>
                </div>
              </div>
              <h2 className="text-[15px] text-center font-semibold mt-2">Delivered</h2>
            </div>
          </div>
        </div>

        <Graph />
      </div>
    </AdminContainer>
  );
};

export default AdminDashboard;
