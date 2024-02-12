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
import { addItemToCart, getProductById } from "@/clientactions";
import { redirect } from "next/dist/server/api-utils";
import successful from "./login/Successful";
import { useRouter } from "next/navigation";

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

const exampleProduct = {
  name: "Fresh Bread",
  price: 4.99,
  foodCost: 6.7,
  timeCost: 2,
  picture: "",
  id: 3,
  description: "HIGH IN carbo",
  categoryID: 2,
  warnings: "none",
  nutrientInformation: "fibre",
};

// const getProduct = async (id: any) => {
//   // const product: Product = await getProductById(id);
//   // console.log(product);
//   return product;
// };

// setInterval(getProductById,2000)

var universalProductId: number = 1;
export const setUniversalProductId = (value: number) => {
  universalProductId = value;
};

const ProductDialog: React.FC<ProductProps> = ({ prod }) => {
  prod = exampleProduct;
  // console.log(productID)
  // console.log(universalProductId)
  // const selectedProduct = getProduct(universalProductId);
  // console.log(prod)

  // console.log(selectedProduct)
  const added:boolean = false
  const handleClick = async (cartId: number, quantity: number, id: number) => {
    const response = await addItemToCart(cartId, quantity, id);
    if (response == "Product added to cart successfully") {
      return response;
    } else {
      return <p>Failed to add item to cart</p>;
    }
  };

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
                            onClick={() => handleClick(4, 1, prod.id)}
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
