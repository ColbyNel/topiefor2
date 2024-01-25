import { getAllItemsFromCategory, getCategoryById } from "@/actions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default async function SinglePage({ params: { categoryId } }) {
//   const category = await getCategoryById(categoryId);
  const items = await getAllItemsFromCategory(categoryId);

  return (
    <>
      <Header />

      <div className="bg-secondary flex min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center pb-12">Sweet</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {items.map(({ id, name, price }) => (
              <a
                key={id}
                href="/"
                className="group"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                  <img
                    src="/1.jpg"
                    alt={name}
                    className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 text-lg text-white">{itemTitle}</h3>
                <p className="mt-1 text-lg font-medium text-primary">
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
