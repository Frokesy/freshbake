import { useState, useRef } from "react";
import Button from "../../defaults/Button";
import Input from "../../defaults/Input";
import { ArrowLeft } from "../../icons";
import { BrokenImage } from "../icons";
import { supabase } from "../../../../utils/supabaseClient"; // Ensure this path is correct
import Spinner from "../../defaults/Spinner";
import { Bounce, toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    tag: "",
    price: "",
    size: "",
    desc: "",
  });

  const [pic, setPic] = useState<string | undefined>(undefined);
  const [picLoading, setPicLoading] = useState<boolean>(false);
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const updatePic = (pics: File | undefined) => {
    if (!pics) {
      setError((prevState) => ({
        ...prevState,
        image: "Please select an image",
      }));
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setPicLoading(true);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "loveatlast");
      data.append("cloud_name", "dapeum1v8");

      fetch("https://api.cloudinary.com/v1_1/dapeum1v8/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
        });
    } else {
      toast.error("Image type not supported", {
        position: "top-right",
        theme: "light",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { name, category, tag, price, size, desc } = formData;

    if (!name || !category || !tag || !price || !size || !desc || !pic) {
      toast.error("Please fill all the fields!", {
        position: "top-right",
        theme: "light",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }

    const { error: supabaseError } = await supabase
      .from("product-catalog")
      .insert({
        type: name,
        category,
        tag,
        price: price,
        weight: `${size}g`,
        desc,
        img: pic,
      });

    setLoading(false);

    if (supabaseError) {
      setError((prevState) => ({
        ...prevState,
        supabase: "Error saving product. Please try again.",
      }));
    } else {
      toast.success("Product added successfully!", {
        position: "top-right",
        theme: "light",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setFormData({
        name: "",
        category: "",
        tag: "",
        price: "",
        size: "",
        desc: "",
      });
      setPic(undefined);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    updatePic(file);
  };

  return (
    <div className="bg-[#fff] min-h-screen">
      <ToastContainer />
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <div className="bg-[#ccc] p-1.5 rounded-full">
            <ArrowLeft />
          </div>
        </div>
        <h2 className="font-semibold text-[24px]">Add Product</h2>
      </div>

      <div className="mt-6 px-4">
        <div
          className="bg-[#ccc] flex items-center justify-center py-6 cursor-pointer"
          onClick={handleImageClick}
        >
          {pic ? (
            <img src={pic} alt="Product" className="w-[100px]" />
          ) : (
            <div className="">{picLoading ? <Spinner /> : <BrokenImage />}</div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />

        <div className="text-[14px] mt-4 space-y-5">
          <h2 className="text-center">Upload Product Category</h2>
          <Input
            placeholder="Enter Product Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <select
            name="category"
            id="category"
            className="w-[100%] py-2 px-3 bg-[#fff] border border-[#ccc] shadow-md hover:shadow-xl transition-all duration-500 ease-in-out rounded-md outline-none"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Product Category</option>
            <option value="Sardine Bread">Sardine Bread</option>
            <option value="Buttered Bread">Buttered Bread</option>
          </select>
          <select
            name="tag"
            id="tag"
            className="w-[100%] py-2 px-3 bg-[#fff] border border-[#ccc] shadow-md hover:shadow-xl transition-all duration-500 ease-in-out rounded-md outline-none"
            value={formData.tag}
            onChange={handleInputChange}
          >
            <option value="">Select Product Tag</option>
            <option value="Sardine">Sardine</option>
            <option value="Buttered">Buttered</option>
          </select>
          <div className="flex justify-between w-[100%]">
            <div className="w-[48%]">
              <Input
                placeholder="$ Enter Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-[48%]">
              <Input
                placeholder="Enter Size"
                type="number"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <textarea
            name="desc"
            id="desc"
            placeholder="Write Product Description"
            className="border border-[#ccc] bg-inherit py-2 w-[100%] hover:shadow-xl transition-all duration-500 ease-in-out rounded-md shadow-md outline-none px-3"
            value={formData.desc}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="pt-10 pb-[20vh]">
          <Button
            filled
            content={loading ? <Spinner /> : "Add Product"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>

        {error.form && <p className="text-red-500">{error.form}</p>}
        {error.supabase && <p className="text-red-500">{error.supabase}</p>}
        {error.image && <p className="text-red-500">{error.image}</p>}
      </div>
    </div>
  );
};

export default AddProduct;
