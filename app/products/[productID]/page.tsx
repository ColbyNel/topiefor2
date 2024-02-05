"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const getProductById = async (productId: any) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/get_product/${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["product"],
      },
    }
  );
  return await req.json();
};

const product = async ({ params: { productID } }: any) => {

  const handleClick = () => {
    console.log("Button Clicked")
  }

  

  const addItemToCart = async (cartId: any, quantity: any, id: any) => {
    console.log(JSON.stringify(id));
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shopping_carts/add_product/${cartId}?quantity=${quantity}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      }
    );
    const response = req;

    return response.text();
  };
  // setInterval(getProductById,2000)

  const product = await getProductById(productID);
  
  return (
    <div className="flex items-center justify-center h-screen" suppressHydrationWarning>
      <div className="flex flex-wrap items-center lg:justify-between justify-center">
        <div className="focus:outline-none mx-2 w-72 xl:mb-0 mb-8">
          <div>
            <img
              alt={product.name}
              src={product.comment}
              className="focus:outline-none object-cover w-full h-44 rounded-t-xl"
            />
          </div>
          <div className="bg-primary rounded-b-xl">
            <div className="p-4">
              <div className="flex items-center">
                <h2 className="focus:outline-none text-lg font-extrabold text-white">
                  {product.name}
                </h2>
              </div>
              <p className="focus:outline-none text-xs text-gray-200 mt-2">
                {product.description}
              </p>
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mb-3 mt-3 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                R{product.price}
              </span>

              <p className="focus:outline-none text-xs text-gray-200 mt-2">
                Nutrient Info: {product.nutrientInformation}
              </p>
              <p className="focus:outline-none text-xs text-gray-200 mt-2">
                Allergens: {product.warnings}
              </p>
              {/* <form className="pt-7 pb-2">
                <label
                  htmlFor="number-input"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1"
                  required
                />
              </form> */}

              <div className="flex items-center justify-center mt-4 ">
                <div className="pt-6 pb-2">
                <button
                    // onClick={handleClick}
                    className="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-white transition-colors hover:bg-secondary focus:outline-none focus:ring active:bg-secondary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default product;
