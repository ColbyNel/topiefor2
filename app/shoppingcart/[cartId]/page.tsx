"use client"
import { deleteProductFromCart} from "@/actions";
import { Link } from "lucide-react";
import { type } from "os";
import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  comment: string;
}



const getProductsFromCart = async (cartId: number) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shopping_carts/get_shoppingcart/${cartId}`,
    {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
      }
    }
  )
  return req.json();
}
const getProducts = async (id:number) => {
  const products:Product = await getProductsFromCart(id);
  return products;
}


const cart = ({ params: { cartId } }: any) => {

  const demoProducts = {
    "cardID": 1,
    "products": [
        {
            "name": "Chocolate Cake",
            "price": 54.99,
            "foodCost": 8.5,
            "timeCost": 3,
            "picture": "/choccake.jpg",
            "id": 2,
            "warnings": "none",
            "nutrientInformation": "fibre and calcium",
            "description": "High in chocolate",
            "categoryID": 1
        },
        {
            "name": "Fresh Bread",
            "price": 25.99,
            "foodCost": 6.7,
            "timeCost": 2,
            "picture": "/loaf.jpg",
            "id": 3,
            "warnings": "none",
            "nutrientInformation": "fibre",
            "description": "HIGH IN carbo",
            "categoryID": 2
        }
    ],
    "totalAmount": 119.96
  }
  const cartProducts = getProducts(2);
  const allProducts =cartProducts.products;
  // console.log(cartProducts)
  const allProducts = demoProducts.products;
  const newValue: number = 1;

  const [cartItems, setCartItems] = useState(demoProducts.products.map(product => ({ ...product, quantity: 1 })));
  let totalPrice = 0;

  const incrementPrice = (price: number, quantity: number) => {
    return price * quantity;
  };

  const handleInputChange = (index: number, quantity: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };


  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-8xl font-chicle">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems.map(({ id, name, price, description, picture, quantity }, index) => (
            <div key={id} className="item-hover justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img
                src={picture}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{name}</h2>
                  <p className="mt-1 text-xs text-gray-700 mb-8">{description}</p>
                  <input
                    className="h-8 w-8 border bg-white text-center text-xs outline-none"
                    type="number"
                    aria-describedby="helper-text-explanation"
                    placeholder="1"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleInputChange(index, parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100"></div>
                  <div className="flex items-center space-x-4">
                    <p className="text-2xl">R{incrementPrice(price, quantity)}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">R{cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0).toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">R15.00</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">R{(cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0) + 15).toFixed(2)}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <a className="button-hover mt-10 justify-center flex rounded-md bg-primary px-12 py-1.5 font-medium text-blue-50 hover:bg-red-600 hover:text-white focus:outline-none " href={`/checkout/${cartId}`}>
            Checkout
          </a>
          <a className="button-hover mt-4 justify-center flex rounded-md bg-slate-600 px-12 py-1.5 font-medium text-blue-50 hover:bg-slate-700 hover:text-white focus:outline-none " href="/categories">
            Back to Menu
          </a>
        </div>
      </div>
    </div>
  );
};
export default cart;
