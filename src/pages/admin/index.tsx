/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Graph from "../../components/admin/defaults/Chart";
import { OrderIcon } from "../../components/admin/icons";
import AdminContainer from "../../components/containers/AdminContainer";
import { OrderItemProps } from "../orders";
import { supabase } from "../../../utils/supabaseClient";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);


const AdminDashboard = () => {
  const [orderItems, setOrderItems] = useState<OrderItemProps[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [processingPercentage, setProcessingPercentage] = useState<number>(0);
  const [outForDeliveryPercentage, setOutForDeliveryPercentage] =
    useState<number>(0);
  const [deliveredPercentage, setDeliveredPercentage] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [view, setView] = useState<string>("Last 7 Days");

  const calculateMetrics = (orders: OrderItemProps[]) => {
    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
      (sum, order) => sum + (parseFloat(order.totalCost) || 0),
      0
    );
    setTotalRevenue(totalRevenue);

    const processingOrders = orders.filter(
      (order) => order.orderStatus === "Processing"
    ).length;
    const outForDeliveryOrders = orders.filter(
      (order) => order.orderStatus === "Out for Delivery"
    ).length;
    const delivered = orders.filter(
      (order) => order.orderStatus === "Delivered"
    ).length;

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

  const transformDataForChart = (orders: OrderItemProps[], view: string) => {
    let data: any[] = [];
    const today = dayjs();

    const generateMonthsArray = (months: number) => {
      return Array.from({ length: months }, (_, i) =>
        today.subtract(i, "month").format("MMM")
      ).reverse();
    };

    if (
      view === "Last 12 Months" ||
      view === "Last 6 Months" ||
      view === "Last 3 Months"
    ) {
      const months =
        view === "Last 12 Months" ? 12 : view === "Last 6 Months" ? 6 : 3;
      const monthsArray = generateMonthsArray(months);

      const monthlyData = orders.reduce((acc: any, order) => {
        const orderMonth = dayjs(order.created_at).format("MMM");
        if (!acc[orderMonth]) {
          acc[orderMonth] = 0;
        }
        acc[orderMonth] += parseFloat(order.totalCost) || 0;
        return acc;
      }, {});

      data = monthsArray.map((month) => ({
        label: month,
        revenue: monthlyData[month] || 0,
      }));
    } else if (view === "Last Month") {
         const startOfLastMonth = today.subtract(1, "month").startOf("month");
         const endOfLastMonth = startOfLastMonth.endOf("month");
   
         const weeksArray: any[] = [];
         let currentWeekStart = startOfLastMonth;
         let weekNumber = 1;
 
         while (currentWeekStart.isBefore(endOfLastMonth)) {
             const currentWeekEnd = currentWeekStart.endOf("week").isAfter(endOfLastMonth)
                 ? endOfLastMonth
                 : currentWeekStart.endOf("week");
             
             weeksArray.push({
                 start: currentWeekStart,
                 end: currentWeekEnd,
                 label: `Week ${weekNumber++}`
             });
 
             currentWeekStart = currentWeekStart.add(1, "week");
         }
   
         const weeklyData = orders.reduce((acc: any, order) => {
             const orderDate = dayjs(order.created_at);
 
             weeksArray.forEach((week, index) => {
                 if (orderDate.isBetween(week.start, week.end, null, "[]")) {
                     if (!acc[index]) {
                         acc[index] = 0;
                     }
                     acc[index] += parseFloat(order.totalCost) || 0;
                 }
             });
             return acc;
         }, {});
   
         data = weeksArray.map((week, index) => ({
             label: week.label,
             revenue: weeklyData[index] || 0,
         }));
    }  else if (view === "Last 7 Days") {
      const last7DaysArray = Array.from({ length: 7 }, (_, i) =>
        today.subtract(i, "day").format("ddd")
      ).reverse();

      const last7DaysData = orders.reduce((acc: any, order) => {
        const orderDay = dayjs(order.created_at).format("ddd");
        if (!acc[orderDay]) {
          acc[orderDay] = 0;
        }
        acc[orderDay] += parseFloat(order.totalCost) || 0;
        return acc;
      }, {});

      data = last7DaysArray.map((day) => ({
        label: day,
        revenue: last7DaysData[day] || 0,
      }));
    }

    setChartData(data);
  };

  useEffect(() => {
    const getOrders = async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        console.error(error);
      } else {
        setOrderItems(data);
        transformDataForChart(data, view);
      }
    };
    getOrders();
  }, [view]);

  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setView(event.target.value);
    transformDataForChart(orderItems, event.target.value);
  };
  

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
              <h2 className="text-[20px] font-semibold">
                ${totalRevenue.toLocaleString()}
              </h2>
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

          <div className="flex justify-between mt-3 space-x-3">
            <div className="flex flex-col items-center">
              <div className="py-1 px-1 relative border-[14px] border-t-[#7d6c3a] border-b-[#7d6c3a] -rotate-45 border-r-[#bd9e1e] border-l-[#7d6c3a] rounded-full flex items-center">
                <div className="bg-[#fff] rotate-45 w-[60px] h-[60px] flex items-center justify-center rounded-full">
                  <h2>{processingPercentage.toFixed(0)}%</h2>
                </div>
              </div>
              <h2 className="text-[15px] text-center font-semibold mt-2">
                Processing
              </h2>
            </div>

            <div className="flex flex-col items-center">
              <div className="py-1 px-1 relative border-[14px] border-t-[#bd9e1e] rotate-45 border-b-[#bd9e1e] border-r-[#bd9e1e] border-l-[#7d6c3a] rounded-full flex items-center">
                <div className="bg-[#fff] -rotate-45 w-[60px] h-[60px] flex items-center justify-center rounded-full">
                  <h2>{deliveredPercentage.toFixed(0)}%</h2>
                </div>
              </div>
              <h2 className="text-[15px] text-center font-semibold mt-2">
                Out for Delivery
              </h2>
            </div>

            <div className="flex flex-col items-center">
              <div className="py-1 px-1 relative border-[14px] border-t-[#bd9e1e] border-b-[#7d6c3a] rotate-45 border-r-[#bd9e1e] border-l-[#7d6c3a] rounded-full flex items-center">
                <div className="bg-[#fff] w-[60px] h-[60px] flex items-center justify-center rounded-full -rotate-45">
                  <h2>{outForDeliveryPercentage.toFixed(0)}%</h2>
                </div>
              </div>
              <h2 className="text-[15px] text-center font-semibold mt-2">
                Delivered
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 px-4 flex items-center justify-between pb-4">
        <h2 className="font-semibold">Total Revenue($)</h2>

        <select
          value={view}
          onChange={handleViewChange}
          className="bg-inherit outline-none text-[14px] border border-[#808080] rounded-md p-1"
        >
          <option value="Last 12 Months">Last 12 Months</option>
          <option value="Last 6 Months">Last 6 Months</option>
          <option value="Last 3 Months">Last 3 Months</option>
          <option value="Last Month">Last Month</option>
          <option value="Last 7 Days">Last 7 Days</option>
        </select>
      </div>
      <Graph data={chartData} />
    </AdminContainer>
  );
};

export default AdminDashboard;
