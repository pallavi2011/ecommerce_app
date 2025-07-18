'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import UploadImage from "@/components/Upload_Image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const IMAGEKIT_URL = "https://upload.imagekit.io/api/v1/files/upload";
const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const AddProduct = () => {
  const { getToken } = useAppContext();

  const [files, setFiles] = useState([null, null, null, null]);
  const [imageUrls, setImageUrls] = useState([null, null, null, null]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState('Manual Entry');

  // Get ImageKit auth params from your API
  const getImageKitAuth = async () => {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) throw new Error("Failed to get ImageKit auth");
    return res.json();
  };

  // Upload a single file to ImageKit and return the URL
  const uploadToImageKit = async (file) => {
    const { signature, expire, token, publicKey } = await getImageKitAuth();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("signature", signature);
    formData.append("expire", expire);
    formData.append("token", token);
    formData.append("publicKey", publicKey);

    try {
      const res = await fetch(IMAGEKIT_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) return data.url;
      throw new Error(data.message || "ImageKit upload failed");
    } catch (err) {
      toast.error("Image upload failed: " + err.message);
      return null;
    }
  };

  // Handle file upload to ai
 const handleFileChangeForAI = async (e, index) => {
  const file = e.target.files[0];
  if (!file) return;
  setUploading(true);
  const url = await uploadToImageKit(file);
  setUploading(false);

  if (url) {
    const updatedFiles = [...files];
    const updatedUrls = [...imageUrls];
    updatedFiles[index] = file;
    updatedUrls[index] = url;
    setFiles(updatedFiles);
    setImageUrls(updatedUrls);

    const token = await getToken();
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post('/api/product/ai-search', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (data.success){
      console.log(data.data);
      setName(data.data.brand);
      setDescription(data.data.description);
      setCategory(data.data.category);
     const numbers = data.data.price.match(/\d+/g);
      setPrice(numbers ? numbers[0] : "");
      setImageUrls(updatedUrls); // <-- now updatedUrls is defined!
    }
  }
};
  // Handle file selection and upload to ImageKit
  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadToImageKit(file);
    setUploading(false);

    if (url) {
      const updatedFiles = [...files];
      const updatedUrls = [...imageUrls];
      updatedFiles[index] = file;
      updatedUrls[index] = url;
      setFiles(updatedFiles);
      setImageUrls(updatedUrls);
    }


  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUrls.filter(Boolean).length === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      images: imageUrls.filter(Boolean),
    };

    try {
      const token = await getToken();
      const { data } = await axios.post('/api/product/add', productData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success(data.message);
        setFiles([null, null, null, null]);
        setImageUrls([null, null, null, null]);
        setName('');
        setDescription('');
        setCategory('Earphone');
        setPrice('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <Tabs defaultValue="ai" className="mt-6" value={tab} onValueChange={setTab}>
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="manual">Manual Entry</TabsTrigger>
    <TabsTrigger value="ai">AI Upload</TabsTrigger>
  </TabsList>
  <TabsContent value="manual"> 
    <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <UploadImage
                  onChange={(e) => handleFileChange(e, index)}
                  id={`image${index}`}
                />
                <Image
                  className="max-w-24 cursor-pointer mt-2"
                  src={imageUrls[index] || assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                  onClick={() => {
                    document.getElementById(`image${index}`)?.click();
                  }}
                />
              </div>
            ))}
          </div>
          {uploading && <p className="text-orange-600 mt-2">Uploading...</p>}
        </div>
         
         <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded cursor-pointer"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "ADD"}
        </button>
      </form>
      </TabsContent>
  <TabsContent value="ai">
          <Card className="max-w-lg mx-auto mt-6">
            <CardHeader className='text-center'>
              
              <CardDescription>
                Upload an image of the product and let AI extract the details.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center items-center justify-center">
              <form  className="space-y-6">
               <div>
                <p className="text-base font-medium">Product Image</p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
           
              <div className="flex flex-col items-center justify-center w-full">
                <UploadImage onChange={(e)=>handleFileChangeForAI(e, 0)} id="image0" />
                <Image
                  className="max-w-24 cursor-pointer mt-2"
                  src={imageUrls[0] || assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                  onClick={() => {
                    document.getElementById("image0")?.click();
                  }}
                />
              </div>
          
          </div>
          {uploading && <p className="text-orange-600 mt-2">Uploading...</p>}
        </div>
              
              </form>
            </CardContent>
          </Card>
  </TabsContent>
</Tabs>
     
    </div>
  );
};

export default AddProduct;