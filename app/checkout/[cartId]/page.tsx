import { getProductsFromCart } from "@/actions";
import { addPayment, createOrder } from "@/clientactions";
import Header from "@/components/Header";
import { ValidatePaymentDialog } from "@/components/ValidatePaymentDialog";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  comment: string; // Assuming comment is a valid image URL
}

const checkout = async ({ params: { cartId } }: any) => {
  const cartProducts = await getProductsFromCart(cartId);
  // console.log(cartProducts)
  
  const allProducts = cartProducts.products;
  let totalPrice: number = 0;
  const incrementPrice = (price: number) => {
    totalPrice += price;
    return price;
  };

  const demoUserId = 5;

  const createCustomerOrder = () => {
    const response = createOrder(demoUserId, "No comment", (totalPrice+15));
    return response;
  };

  const createPayment = () => {
    const response = addPayment(20,2,95.98)
    return response;
  }

  // console.log(createCustomerOrder());
  // console.log(createPayment())
  
  return (
    <>
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-8xl font-chicle">Checkout</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-sm md:w-2/3 ">
            {allProducts.map(({ name, price, picture }: any) => (
              <a key={name}>
                <div className=" justify-between mb-2 rounded-lg bg-white p-6 sm:flex sm:justify-start">
                  <div className="aspect-square w-28 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-7 xl:aspect-w-7 ">
                    <img
                      src={picture}
                      alt={name}
                      className=" h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {name}
                      </h2>
                      <p>Quantity: 1</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100"></div>
                      <div className="flex items-center space-x-4">
                        <p className="text-2xl">R{incrementPrice(price)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
            {/*Shipping Fee*/}
            <div className=" justify-between mb-2 rounded-lg bg-white p-6 sm:flex sm:justify-start">
              <div className="mt-5 mr-5 sm:mt-0">
                <h2 className="text-xl font-bold text-gray-900">
                  Shipping Fee
                </h2>
              </div>
              <div className="mt-4 ml-96 flex justify-end sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center space-x-4">
                  <p className="text-2xl">R15.00</p>
                </div>
              </div>
            </div>
            <div className="justify-between mb-2 rounded-lg bg-white p-6 sm:flex sm:justify-start">
              <div className="mt-5 mr-20 sm:mt-0">
                <h2 className="text-3xl font-bold text-gray-900">Total</h2>
              </div>
              <div className="mt-4 ml-96 flex justify-end sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center space-x-4">
                  <p className="text-2xl font-bold">R{totalPrice + 15}</p>
                  <div className="text-transparent hidden">
                  {createCustomerOrder()}
                  {createPayment()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Payment Buttons*/}

        <div className="flex items-center justify-center flex-col bg-slate-100 mt-8">
          {" "}
          <ValidatePaymentDialog paymentType={"MasterCard"} />
          <ValidatePaymentDialog paymentType="Apple Pay" />
          <a
            className="mt-5 mb-2 inline-block rounded border border-primary px-12 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none active:bg-primary"
            href={`/shoppingcart/${cartId}`}
          >
            Back to Cart
          </a>
          <a
            className="mb-28 inline-block rounded border border-secondary px-12 py-3 text-sm font-medium text-secondary hover:bg-secondary hover:text-white focus:outline-none active:bg-secondary"
            href="/categories"
          >
            Back to Menu
          </a>
        </div>
      </div>
    </>
  );
};
export default checkout;
