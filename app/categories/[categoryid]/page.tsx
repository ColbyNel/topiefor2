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

export default async function SinglePage({ params: { categoryId } }: any) {
  //   const category = await getCategoryById(categoryId);
  const items = await getProductsByCategory(categoryId);
  const category = await getCategoryById(categoryId);

  const assessAvailability = async (productId: number) => {
    let returnValue: boolean = false;
    const status: string = await checkProductAvailability(productId);
    const firsThreeWords = status.split(" ").slice(0, 3).join(" ");
    const deleteStatus = await deleteProductFromCart(1, productId);
    if (firsThreeWords == "Product is out") {
      return returnValue;
    } else {
      returnValue = true;
      return returnValue;
    }
  };

  const convertBlobToImage = (picture: any) => {
    // const byteCharacters = atob(data.picture);
    const byteNumbers = new Array(picture.length);
    for (let i = 0; i < picture.length; i++) {
      byteNumbers[i] = picture.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    // Create a URL for the Blob
    const pictureUrl = URL.createObjectURL(blob);
    return pictureUrl;
  };

  // setInterval(getProductsByCategory,2000
  return (
    <>
      <Header />

      <div className="bg-white flex min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-8xl font-chicle font-bold text-black text-center pb-32">
            {category.description}
          </h2>
          <div className="grid grid-cols-3 gap-x-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {items.map(
              async ({ id, name, price, description, picture }: any) => {
                const available = await assessAvailability(id);
                const byteCharacters = atob(picture);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: "image/png" });

                // Create a URL for the Blob
                const pictureUrl = URL.createObjectURL(blob);
                console.log(pictureUrl);


                return available ? (
                  <a
                    key={id}
                    href="#"
                    className="item-hover border-black group"
                    // onClick={(event) => setProductId(event, id)}
                  >
                    <div className="relative aspect-square w-100 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                      <img
                        src={pictureUrl}
                        alt={name}
                        className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
                        style={{ maxHeight: "300px" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center transition duration-300 ease-in-out hover:scale-110">
                        <ProductDialog productID={id} />
                      </div>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-black">
                      {name}
                    </h3>
                    <p className="mt-3 text-lg text-slate-500">{description}</p>
                    <p className="mt-1 text-xl font-medium text-primary">
                      R{price}
                    </p>
                  </a>
                ) : (
                  <a key={id} className="item-hover border-black group">
                    <div className="relative aspect-square w-100 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                      <img
                        src={pictureUrl}
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
