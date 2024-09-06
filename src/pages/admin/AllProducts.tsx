import { NavLink } from "react-router-dom";
import AdminContainer from "../../components/containers/AdminContainer";
import { ArrowLeft, DeleteIcon } from "../../components/icons";
import { PlusIcon } from "../../components/admin/icons";

const AllProducts = () => {
  return (
    <AdminContainer active="Products">
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <NavLink
            to="/admin/dashboard"
            className="bg-[#ccc] p-1.5 rounded-full"
          >
            <ArrowLeft />
          </NavLink>
        </div>
        <h2 className="font-semibold text-[24px]">Products</h2>
      </div>

      <div className="bg-[#fff] flex justify-between items-center px-4 py-4 mt-6">
        <h2 className="text-[14px]">Add Product</h2>
        <div className="bg-[#f9f3db] p-2 rounded-full">
          <PlusIcon />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between px-4 py-4 bg-[#fff]">
          <div className="flex items-center space-x-6">
            <img
              src="/assets/products/img_one.png"
              alt="img"
              className="w-[52px] h-[52px] rounded-full"
            />
            <div className="space-y-2">
              <h2 className="text-[16px]">Butter Bread</h2>
              <p className="text-[14px]">800g Family Loaf</p>
            </div>
          </div>

          <div
            //   onClick={() => handleDelete(product)}
            className="bg-[#fae0e2] p-2 rounded-full"
          >
            <DeleteIcon />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-4 bg-[#fff]">
          <div className="flex items-center space-x-6">
            <img
              src="/assets/products/img_one.png"
              alt="img"
              className="w-[52px] h-[52px] rounded-full"
            />
            <div className="space-y-2">
              <h2 className="text-[16px]">Butter Bread</h2>
              <p className="text-[14px]">800g Family Loaf</p>
            </div>
          </div>

          <div
            //   onClick={() => handleDelete(product)}
            className="bg-[#fae0e2] p-2 rounded-full"
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default AllProducts;
