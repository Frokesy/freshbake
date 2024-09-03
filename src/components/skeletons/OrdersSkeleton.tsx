import { FC } from "react";

const OrdersSkeleton: FC = () => {
  return (
    <div className="mt-8 space-y-4">

      {[...Array(2)].map((_, index) => (
        <div key={index} className="mb-4">
          <div className="cursor-pointer flex items-center justify-between px-4 py-2 bg-gray-100">
            <div className="w-1/3 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersSkeleton;
