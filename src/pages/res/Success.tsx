import { NavLink, useLocation } from "react-router-dom";
import Button from "../../components/defaults/Button";

const Success = () => {
  const location = useLocation();
  const { response } = location.state || {};

  return (
    <div className="h-[100vh] w-[100%] mx-auto flex flex-col items-center justify-center">
      <div className="h-[246px] w-[246px]">
        <img
          src="/assets/success.png"
          alt="img"
          className="w-[100%] h-[100%]"
        />
      </div>

      <h2 className="text-[24px] font-semibold">Order Placed!!</h2>
      <p className="text-[14px] text-[#404040]">
        Your order #{response.transaction_id} is successfully placed
      </p>
      <div className="px-4 mt-6 space-y-6 pt-10 pb-20 w-[100%]">
        <NavLink to={`/orders/track-order/${response.transaction_id}`}>
          <Button filled={true} content="Track Order" className="text-[18px]" />
        </NavLink>
        <div className="">
          <NavLink to="/home">
            <Button
              filled={false}
              content="Back Home"
              className="text-[18px]"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Success;
