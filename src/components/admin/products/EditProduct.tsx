import { FC, useRef, useState, useEffect } from "react";
import { ProductItemProps } from "../../sections/products/Catalog";
import { ArrowLeft } from "../../icons";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { supabase } from "../../../../utils/supabaseClient";
import Spinner from "../../defaults/Spinner";
import Input from "../../defaults/Input";
import Button from "../../defaults/Button";

interface EditProductProps {
  setEditedProduct: React.Dispatch<
    React.SetStateAction<ProductItemProps | undefined>
  >;
  editedProduct: ProductItemProps | undefined;
}

const EditProduct: FC<EditProductProps> = ({
  editedProduct,
  setEditedProduct,
}) => {
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

  useEffect(() => {
    if (editedProduct) {
      setFormData({
        name: editedProduct.type || "",
        category: editedProduct.category || "",
        tag: editedProduct.tag || "",
        price: editedProduct.price || "",
        size: editedProduct.weight ? editedProduct.weight.replace("g", "") : "",
        desc: editedProduct.desc || "",
      });
      setPic(editedProduct.img);
    }
  }, [editedProduct]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputFocus = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name } = e.target;

    // Assert that name is a key of formData
    setFormData((prevState) => ({
      ...prevState,
      [name as keyof typeof formData]:
        prevState[name as keyof typeof formData] || "",
    }));
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

    if (!name || !category || !tag || !price || !size || !desc) {
      toast.error("Please fill all the fields!", {
        position: "top-right",
        theme: "light",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setLoading(false);
      return;
    }

    const updatedData = {
      type: name || editedProduct?.type,
      category: category || editedProduct?.category,
      tag: tag || editedProduct?.tag,
      price: price || editedProduct?.price,
      weight: `${size || editedProduct?.weight?.replace("g", "")}g`,
      desc: desc || editedProduct?.desc,
      img: pic || editedProduct?.img,
    };

    const { error: supabaseError } = await supabase
      .from("product-catalog")
      .update(updatedData)
      .eq("id", editedProduct?.id);

    setLoading(false);

    if (supabaseError) {
      setError((prevState) => ({
        ...prevState,
        supabase: "Error updating product. Please try again.",
      }));
    } else {
      toast.success("Product updated successfully!", {
        position: "top-right",
        theme: "light",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500)
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

  console.log(error);
  return (
    <div className="bg-[#fff] min-h-screen">
      <ToastContainer />
      <div className="flex items-center space-x-4 px-4 pt-10">
        <div className="flex">
          <div
            onClick={() => setEditedProduct(undefined)}
            className="bg-[#ccc] p-1.5 rounded-full"
          >
            <ArrowLeft />
          </div>
        </div>
        <h2 className="font-semibold text-[24px]">Edit Product</h2>
      </div>

      <div className="mt-6 px-4">
        <div className="w-[100%] flex items-center" onClick={handleImageClick}>
          {pic ? (
            <img src={pic} alt="Product" className="w-[100%] h-[200px] object-cover" />
          ) : (
            <div className="w-[100%]">
              {picLoading ? (
                <Spinner />
              ) : (
                <img
                  src={editedProduct?.img}
                  alt="Product"
                  className="w-[100%] h-[200px] object-cover"
                />
              )}
            </div>
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
          <h2 className="text-center font-semibold">Update Product Category</h2>
          <Input
            placeholder="Enter Product Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <select
            name="category"
            id="category"
            className="w-[100%] py-2 px-3 bg-[#fff] border border-[#ccc] shadow-md hover:shadow-xl transition-all duration-500 ease-in-out rounded-md outline-none"
            value={formData.category}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          >
            <option value="">Select Product Category</option>
            <option value="Sardine Bread">Sardine Bread</option>
            <option value="Buttered Bread">Butter Bread</option>
          </select>
          <select
            name="tag"
            id="tag"
            className="w-[100%] py-2 px-3 bg-[#fff] border border-[#ccc] shadow-md hover:shadow-xl transition-all duration-500 ease-in-out rounded-md outline-none"
            value={formData.tag}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          >
            <option value="">Select Product Tag</option>
            <option value="Sardine">Sardine</option>
            <option value="Butter">Butter</option>
          </select>
          <Input
            placeholder="Enter Product Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            placeholder="Enter Product Size (grams)"
            type="text"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Input
            placeholder="Enter Product Description"
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>

        <div className="pt-10 pb-[20vh]">
          <Button
            filled
            content={loading ? <Spinner /> : "Save Changes"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
