import { getAllCategories } from "@/actions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const Categories = async () => {
  const categories = await getAllCategories();
  return (
    <> <div className="bg-gradient-to-tr from-primary via-destructive to-white">
      <div className="bg-transparent -mt-10">
        <div className="pt-10">
      <Header />
      </div>
      </div>
      <div className="bg-transparent flex min-h-screen -mb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-5xl font-bold text-slate-600 text-center pb-12">
              Menu
            </h2>

            <div className="mt-6 flex flex-col items-center space-y-6">
              {categories.map(({ categoryId, description }:any) => (
                <a key={categoryId} href={`/categories/${categoryId}`}>
                  <div className="item-hover group relative h-96 w-full overflow-hidden rounded-lg bg-white">
                    <div className="relative h-96 w-full overflow-hidden rounded-lg bg-white">
                      <div className="absolute inset-0 bg-black opacity-50 hover:opacity-0 transition duration-300 ease-in-out"></div>
                      <img
                        src={`${description}.jpg`}
                        alt={description}
                        className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-white">
                          {description}
                        </h3>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
              <a key="allproducts" href={`/categories/all`}>
                <div className="item-hover group relative h-96 w-full overflow-hidden rounded-lg bg-white">
                  <div className="relative h-96 w-full overflow-hidden rounded-lg bg-white">
                    <div className="absolute inset-0 bg-black opacity-50 hover:opacity-0 transition duration-300 ease-in-out"></div>
                    <img
                      src="/all.jpg"
                      alt="All Products"
                      className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-white">
                        Shop All Products
                      </h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        
      </div>
      <div className="bg-slate-400 mb-28">
      <Footer />
      </div>
      </div>
      
    </>
  );
};
export default Categories;
