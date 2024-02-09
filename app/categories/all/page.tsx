import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductDialog from "@/components/ProductDialog";

interface Category {
  categoryId: number;
  description: string;
}

const getCategoryById = async (categoryId: number): Promise<Category> => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/get_category/${categoryId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!req.ok) {
    throw new Error(`Failed to fetch category. Status: ${req.status}`);
  }

  const data: Category = await req.json();
  return data;
};

const getCategoryNameById = async (categoryID: number) => {
  const categoryObject = getCategoryById(categoryID);
  return (await categoryObject).description;
};

const getAllProducts = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/all_products`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await req.json();
};

const getAllCategories = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/all_categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 10,
        tags: ["categories", "searchCategories"],
      },
    }
  );
  return await req.json();
};

let allProducts1 = await getAllProducts();
let categories = await getAllCategories();

const allProducts = async () => {
  return (
    <>
      <Header />

      <div className="bg-white flex min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="font-chicle text-8xl font-bold text-black text-center pb-20">
            All Products
          </h2>
          <div className="flex flex-row items-center mt-4 mb-8">
            {categories.map(({ categoryId, description }: any) => (
              <a href={`/categories/${categoryId}`} className="button-hover">
                <span
                  key="categories"
                  className="m-2 rounded-full bg-purple-100 px-2.5 py-0.5 text-lg text-purple-700"
                >
                  {description}
                </span>
              </a>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-x-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {allProducts1.map(
              ({ id, name, price, comment, description, categoryID }: any) => (
                <>
                  <a
                    key={id}
                    // href={`/products/${id}`}
                    // onClick={() => ProductDialog(id)}
                    className="item-hover border-black group"
                  >
                    <div className="relative aspect-square w-100 overflow-hidden rounded-lg  xl:aspect-h-8 xl:aspect-w-7 ">
                      <img
                        src={comment}
                        alt={name}
                        className="h-full w-full object-cover object-center hover:blur-sm"
                        style={{ maxHeight: "300px" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center transition duration-300 ease-in-out hover:scale-110">
                        <ProductDialog productID={id} />
                      </div>
                    </div>

                    <h3 className="font-chicle mt-4 mb-3 text-2xl text-black">
                      {name}
                    </h3>
                    <span className=" whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                      {getCategoryNameById(categoryID)}
                    </span>
                    <p className="mt-3 text-lg text-slate-500">{description}</p>
                    <p className="mt-1 text-xl font-medium text-primary">
                      R{price}
                    </p>
                  </a>
                </>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default allProducts;
