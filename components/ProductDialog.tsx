"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import CartDialog from "./CartDialog";

interface ProductProps {
  // productID: number;
  prod: any;
}

// interface addToCartProps {
//   productId: number,
//   quantity:

// }

interface Product {
  id: number;
  name: string;
  description: string;
  warnings: string;
  categoryID: number;
  nutrientInformation: string;
  price: number;
}

// const exampleProduct = {
//   id: 1,
//   name: "Choc and Pecan Cookies",
//   description: "A delicious twist on a classic combo",
//   warnings: "Contains Nuts",
//   categoryID: 2,
//   nutrientInformation: "Protein 6g Fat 5g Sugar 8g",
//   price: 23,
//   picture: "/2.jpg"
// }

// const getProductById = async (productId: number) => {
//   const req = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/products/get_product/${productId}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       next: {
//         revalidate: 60,
//         tags: ["get_product"],
//       },
//     }
//   );
//   return await req.json();
// };

// const getProduct = async (id: any) => {
//   // const product: Product = await getProductById(id);
//   // console.log(product);
//   return product;
// };

const addItemToCart = async (cartId: any, quantity: any, id: any) => {
  // const thisproduct = getProduct(id);
  // console.log(JSON.stringify({ id: id }));
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shopping_carts/add_product/${cartId}?quantity=${quantity}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }
    );

    const responseText = await req.text();
    // console.log(responseText);
    return responseText;
  } catch (error) {
    return (
      <div>
        <h1>Unable to add product to cart</h1>
      </div>
    );
  }
};
// setInterval(getProductById,2000)

const handleClick = async (cartId: number, quantity: number, id: number) => {
  const response = await addItemToCart(cartId, quantity, id);
  return response;
};

var universalProductId: number = 1;
export const setUniversalProductId = (value: number) => {
  universalProductId = value;
};

const ProductDialog: React.FC<ProductProps> = ({ prod }) => {
  // console.log(productID)
  // console.log(universalProductId);
  console.log(prod);
  // const prod = getProduct(universalProductId);

  // console.log(prod)
  return (
    <Dialog>
      <DialogTrigger className="h-full w-full object-none object-center transition duration-300 ease-in-out hover:backdrop-blur-sm text-opacity-0 hover:text-opacity-80 text-white text-3xl font-bold">
        Yes Please!!!
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-center justify-center w-0 bg-clip-content">
          <div className="flex flex-wrap items-center lg:justify-between justify-center">
            <div className="focus:outline-none mx-2 w-72 xl:mb-0 mb-8">
              <DialogHeader>
                <div key={universalProductId}>
                  <img
                    alt={prod.name}
                    src={prod.picture}
                    className="focus:outline-none object-cover w-full h-44 rounded-t-xl"
                  />
                </div>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <div className="bg-primary rounded-b-xl">
                    <div className="p-4">
                      <div className="flex items-center">
                        <h2 className="focus:outline-none text-lg font-extrabold text-white">
                          {prod.name}
                        </h2>
                      </div>
                      <p className="focus:outline-none text-xs text-gray-200 mt-2">
                        {prod.description}
                      </p>
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mb-3 mt-3 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        R{prod.price}
                      </span>

                      <p className="focus:outline-none text-xs text-gray-200 mt-2">
                        Nutrient Info: {prod.nutrientInformation}
                      </p>
                      <p className="focus:outline-none text-xs text-gray-200 mt-2">
                        Allergens: {prod.warnings}
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
                            onClick={() => handleClick(3, 3, 9)}
                            className="button-hover group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-white transition-colors hover:bg-secondary focus:outline-none focus:ring active:bg-secondary"
                          >
                            Add to Cart
                            {/* <CartDialog link={true} /> */}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-4"></div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ProductDialog;
