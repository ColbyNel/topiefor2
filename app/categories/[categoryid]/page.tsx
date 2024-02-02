import {
  getProductsByCategory,
  getCategoryById,
  getAllProducts,
} from "@/actions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default async function SinglePage({ params: { categoryId } }:any) {
  //   const category = await getCategoryById(categoryId);
  const items = await getProductsByCategory(categoryId);
  const category = await getCategoryById(categoryId);
  // setInterval(getProductsByCategory,2000)
  return (
    <>
      <Header />

      <div className="bg-white flex min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-8xl font-chicle font-bold text-black text-center pb-32">
            {category.description}
          </h2>
          <div className="grid grid-cols-3 gap-x-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {items.map(({ id, name, price, comment,description }:any) => (
              <a key={id} href={`/products/${id}`} className="item-hover border-black group">
                <div className="aspect-square w-100 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                  <img
                    src={comment}
                    alt={name}
                    className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
                    style={{ maxHeight: '300px' }} 
                  />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-black">{name}</h3>
                <p className="mt-3 text-lg text-slate-500">{description}</p>
                <p className="mt-1 text-xl font-medium text-primary">
                  R{price}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
