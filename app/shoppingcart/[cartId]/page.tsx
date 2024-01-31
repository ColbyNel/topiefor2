import { deleteProductFromCart, getProductsFromCart } from "@/actions";
import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  comment: string; // Assuming comment is a valid image URL
}

const cart = async ({ params: { cartId } }: any) => {
  const products = await getProductsFromCart(cartId);
  const allProducts = products.products;
  let totalPrice:number = 0

  const incrementPrice = (price:number) => {
      totalPrice += price
      return price
  }

  const handleRemove = async (cart:number,product:number) => {
    try {
      const response = await deleteProductFromCart(cart, product);

      if (response == "Product removed from cart successfully") {
        console.log('Product removed successfully');
      } else {
        console.error('Failed to remove product from cart');
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  }

  const newValue:number = 1

  const handleInput = (value:number,price:number) => {
    price = value*price
    return price
  }

  return (
    <>
      <body>
        <div className="h-screen bg-gray-100 pt-20">
          <h1 className="mb-10 text-center text-8xl font-chicle">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3 ">
              {allProducts.map(
                ({ id, name, price, description, comment }: Product) => (
                  <a key={name}>
                    <div className="item-hover justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                      <img
                        src={comment}
                        alt="product-image"
                        className="w-full rounded-lg sm:w-40"
                      />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {name}
                          </h2>
                          <p className="mt-1 text-xs text-gray-700 mb-8">
                            {description}
                          </p>

                          
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            id="number-input"
                            aria-describedby="helper-text-explanation"
                            placeholder="1"
                            min="1"
                            
                            // onChange={() => handleInput(newValue,price)}
                            required
                            
                          />
                         
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center border-gray-100"></div>
                          <div className="flex items-center space-x-4">
                            <p className="text-2xl">R{incrementPrice(price)}.00</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                              // onClick={() => handleRemove(cartId,id)}
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                )
              )}
            </div>

            {/* <!-- Sub total --> */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">R{totalPrice}.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">R15.00</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">R{totalPrice + 15}</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-primary py-1.5 font-medium text-blue-50 hover:bg-red-600">
                Check out
              </button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};
export default cart;
