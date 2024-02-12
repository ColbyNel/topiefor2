"use client"
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  getProductsByCategory,
  getCategoryById,
  getAllProducts,
  checkProductAvailability,
  deleteProductFromCart,
} from "@/actions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductDialog, {
  setUniversalProductId,
} from "@/components/ProductDialog";
import React from "react";
import { assessAvailability, getProductById } from "@/clientactions";

interface Product {
  id: number;
  name: string;
  description: string;
  warnings: string;
  categoryID: number;
  nutrientInformation: string;
  price: number;
}

const demoProducts = [
  {
      "name": "Fresh Bread",
      "price": 4.99,
      "foodCost": 6.7,
      "timeCost": 2,
      "picture": "",
      "id": 3,
      "description": "HIGH IN carbo",
      "categoryID": 2,
      "warnings": "none",
      "nutrientInformation": "fibre"
  },
  {
      "name": "Fresh Bread",
      "price": 4.99,
      "foodCost": 6.7,
      "timeCost": 2,
      "picture": "",
      "id": 4,
      "description": "HIGH IN carbo",
      "categoryID": 2,
      "warnings": "none",
      "nutrientInformation": "fibre"
  },
  {
      "name": "Fresh",
      "price": 4.99,
      "foodCost": 6.7,
      "timeCost": 2,
      "picture": "",
      "id": 6,
      "description": "HIGH IN carbo",
      "categoryID": 2,
      "warnings": "none",
      "nutrientInformation": "fibre"
  },
  {
      "name": "Updated Bread",
      "price": 4.99,
      "foodCost": 6.7,
      "timeCost": 2,
      "picture": "",
      "id": 8,
      "description": "HIGH IN carbo",
      "categoryID": 2,
      "warnings": "none",
      "nutrientInformation": "fibre"
  },
  {
      "name": "White bread",
      "price": 4.99,
      "foodCost": 6.7,
      "timeCost": 2,
      "picture": "",
      "id": 13,
      "description": "HIGH IN carbo",
      "categoryID": 2,
      "warnings": "none",
      "nutrientInformation": "fibre"
  },
  {
      "name": "Blue",
      "price": 4.99,
      "foodCost": 6.7,
      "timeCost": 2,
      "picture": "",
      "id": 14,
      "description": "HIGH IN carbo",
      "categoryID": 2,
      "warnings": "none",
      "nutrientInformation": "fibre"
  },
  {
      "name": "Blue",
      "price": 4.99,
      "foodCost": 6.7,
      "timeCost": 2,
      "picture": "",
      "id": 15,
      "description": "HIGH IN carbo",
      "categoryID": 2,
      "warnings": "none",
      "nutrientInformation": "fibre"
  },
  {
      "name": "Freshh",
      "price": 4.99,
      "foodCost": 6.7,
      "timeCost": 2,
      "picture": "",
      "id": 16,
      "description": "HIGH IN carbo",
      "categoryID": 2,
      "warnings": "none",
      "nutrientInformation": "fibre"
  }
]

const getItems = async (id:number) => {
  return await getProductsByCategory(id)
}

const getCategory = async(categoryId:number) => {
  const category = await getCategoryById(categoryId); 
  return category;
}

export default function SinglePage({ params: { categoryId } }: any) {
    // const category = await getCategoryById(categoryId);
  // const items = await getProductsByCategory(categoryId);
  // const category = getCategory(categoryId);

  const [selectedId, setSelectedId] = useState(null);
  



  return (
    <>
      <Header />

      <div className="bg-white flex min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-8xl font-chicle font-bold text-black text-center pb-32">
            {/* {category.description} */}
            Sweet
          </h2>
          <div className="grid grid-cols-3 gap-x-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {demoProducts.map(
               ({ id, name, price, description, picture }: any) => {
                // const available = await assessAvailability(id);
                const available = true;
                


                return available ? (
                  <a
                    key={id}
                    href="#"
                    className="item-hover border-black group"
                    onClick={() => setSelectedId(id)}
                  >
                    <><div className="relative aspect-square w-100 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                    <img
                      src={picture}
                      alt={name}
                      className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
                      style={{ maxHeight: "300px" }} />
                    <div className="absolute inset-0 flex items-center justify-center transition duration-300 ease-in-out hover:scale-110">
                      <ProductDialog prod={selectedId} />
                    </div>
                  </div><h3 className="mt-4 text-2xl font-bold text-black">
                      {name}
                    </h3><p className="mt-3 text-lg text-slate-500">{description}</p><p className="mt-1 text-xl font-medium text-primary">
                      R{price}
                    </p></>
                  </a>
                ) : (
                  <a key={id} className="item-hover border-black group">
                    <div className="relative aspect-square w-100 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                      <img
                        src={picture}
                        alt={name}
                        className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 opacity-70"
                        style={{ maxHeight: "300px" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center transition duration-300 ease-in-out hover:scale-110 ">
                        <h1 className="font-bold hover:">Out of Stock</h1>
                      </div>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-black">
                      {name}
                    </h3>
                    <p className="mt-3 text-lg text-slate-500">Out of Stock</p>
                    <p className="mt-1 text-xl font-medium text-primary">
                      R{price}
                    </p>
                  </a>
                );
              }
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
