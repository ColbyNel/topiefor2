import { getProductById } from "@/actions";

const product = async ({ params: { productID } }: any) => {
  const product = await getProductById(productID);

  return (
    <div className="flex items-center justify-center h-screen">
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
              <form className="pt-7 pb-2">
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
              </form>

              <div className="flex items-center justify-center mt-4 ">
                <div className="pt-6 pb-2">
                  <a
                    className="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-white transition-colors hover:bg-secondary focus:outline-none focus:ring active:bg-secondary"
                    href="/download"
                  >
                    <span className="font-medium transition-colors group-hover:text-white">
                      {" "}
                      Add to Cart{" "}
                    </span>

                    <span className="shrink-0 rounded-full border border-white bg-transparent p-2 group-active:border-secondary">
                      <svg
                        className="h-5 w-5 rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </a>
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
