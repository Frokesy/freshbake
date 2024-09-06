const NewOrders = () => {
  return (
    <div>
      <div className="px-4 mt-6 mb-3 text-[14px] flex items-center space-x-3">
        <h2 className="bg-[#ccc] p-2 rounded-full">JA</h2>
        <div className="flex flex-col space-y-1 w-[100%]">
          <div className="flex justify-between">
            <h2 className="font-semibold">Jackson Adeolu</h2>
            <p className="text-[13px]">Order 123234</p>
          </div>
          <div className="flex justify-between">
            <h2 className="text-[12px]">23rd Aug. 2024</h2>
            <p className="text-[13px]">Total: $40</p>
          </div>
        </div>
      </div>
      <hr />

      <div className="flex flex-col space-y-4 my-4 px-4 text-[14px]">
        <div className="flex justify-between">
          <h2>Coconut Bread 800g Family Loaf</h2>
          <p>Qty: 6</p>
        </div>
        <div className="flex justify-between">
          <h2>Delivery Schedule</h2>
          <p>Sunday</p>
        </div>
        <div className="flex justify-between">
          <h2>Time of Delivery</h2>
          <p>06:00 pm</p>
        </div>
        <div className="flex justify-between">
          <h2>Delivery Address</h2>
          <p className="text-[#bd9e1e]">7890 Maple Ridge Road, SK</p>
        </div>
        <div className="flex justify-between">
          <h2>Phone Number</h2>
          <p>+432-657-3953</p>
        </div>
        <div className="flex justify-between">
          <h2>Sub-total</h2>
          <p>$36</p>
        </div>
        <div className="flex justify-between">
          <h2>Delivery Fee</h2>
          <p>$4</p>
        </div>
        <div className="flex justify-between items-center">
          <h2>Order Status</h2>
          <select
            name="status"
            id="status"
            className="outline-none p-3 rounded-lg bg-[#fff] shadow-lg"
          >
            <option value="">Select</option>
            <option value="">Out for Delivery</option>
            <option value="">Pickup</option>
          </select>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default NewOrders;
