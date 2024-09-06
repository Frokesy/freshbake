import Button from "../../defaults/Button";
import Input from "../../defaults/Input";
import { ArrowLeft } from "../../icons";
import { BrokenImage } from "../icons";

const AddProduct = () => {
  return (
    <div className="bg-[#fff] min-h-screen">
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <div className="bg-[#ccc] p-1.5 rounded-full">
            <ArrowLeft />
          </div>
        </div>
        <h2 className="font-semibold text-[24px]">Add Product</h2>
      </div>

      <div className="mt-6 px-4">
        <div className="bg-[#ccc] flex items-center justify-center py-6">
          <BrokenImage />
        </div>

        <div className="text-[14px] mt-4 space-y-5">
          <h2 className="text-center">Upload Product Category</h2>
          <Input placeholder="Enter Product Name" type="text" />
          <select
            name="category"
            id="category"
            className="w-[100%] py-2 px-3 bg-[#fff] border border-[#ccc] shadow-md hover:shadow-xl transition-all duration-500 ease-in-out rounded-md outline-none"
          >
            <option value="">Select Product Category</option>
            <option value="">Sardine Bread</option>
            <option value="">Buttered Bread</option>
          </select>
          <select
            name="tag"
            id="tag"
            className="w-[100%] py-2 px-3 bg-[#fff] border border-[#ccc] shadow-md hover:shadow-xl transition-all duration-500 ease-in-out rounded-md outline-none"
          >
            <option value="">Select Product Tag</option>
            <option value="">Sardine</option>
            <option value="">Buttered</option>
          </select>
          <div className="flex justify-between w-[100%]">
            <div className="w-[48%]">
              <Input placeholder="$ Enter Price" type="number" />
            </div>
            <div className="w-[48%]">
              <Input placeholder="Enter Size" type="number" />
            </div>
          </div>
          <textarea
            name="desc"
            id="desc"
            placeholder="Write Product Description"
            className="border border-[#ccc] bg-inherit py-2 w-[100%] hover:shadow-xl transition-all duration-500 ease-in-out rounded-md shadow-md outline-none px-3"
          ></textarea>
        </div>

        <div className="pt-10 pb-[20vh]">
          <Button filled content="Add Product" />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
