import { getAllCategories } from "@/actions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const categories = await getAllCategories();

const Categories = () => {
  return (
    <>
      <Header />
      <div className="bg-destructive flex min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-4xl font-bold text-white text-center pb-12">
              Menu
            </h2>
            
            <div className="mt-6 flex flex-col items-center space-y-6">
              
              {categories.map(({categoryId,description}) => (
                <a href={`/categories/${categoryId}`}>
                <div key={categoryId} className="group relative">
                   <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                   
              <img
                src={`${description}.jpg`}
                alt={description}
                className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-50 hover:opacity-0 transition duration-300 ease-in-out"></div>
                
            </div>
            <div className="text-center mt-6">
              <h3 className="text-lg text-white">
                
                  {description}
                
              </h3>
              
            </div>
          </div>
          </a>
        ))}
      </div>
      
    </div>
  </div>
</div>
      <Footer />
    </>
  );
};
export default Categories;
