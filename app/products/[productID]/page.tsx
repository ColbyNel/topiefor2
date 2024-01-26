import { getProductById } from "@/actions";

const product = async ({ params: { id } }: any) => {
  const product = await getProductById(5);

  return (
    <div className="flex items-center">
      <div className="flex flex-wrap items-center lg:justify-between justify-center">
        <div className="focus:outline-none mx-2 w-72 xl:mb-0 mb-8">
          <div>
            <img
              alt={product.name}
              src={product.comment}
              className="focus:outline-none w-full h-44 rounded-t-xl"
            />
          </div>
          <div className="bg-primary rounded-b-xl">
            <div className="p-4">
              <div className="flex items-center">
                <h2 className="focus:outline-none text-lg font-semibold text-white">
                {product.name}
                </h2>
              </div>
              <p className="focus:outline-none text-xs text-gray-200 mt-2">
                {product.description}
              </p>
              <p className="focus:outline-none text-xs text-gray-200 mt-2">
                Nutrient Info: {product.nutrientInformation}
              </p>
              <p className="focus:outline-none text-xs text-gray-200 mt-2">
                Allergens: {product.warnings}
              </p>
              <div className="flex mt-4">
                <div>
                  <p className="focus:outline-none text-xs text-gray-600 px-2 bg-gray-200 py-1">
                    12 months warranty
                  </p>
                </div>
                <div className="pl-2">
                  <p className="focus:outline-none text-xs text-gray-600 px-2 bg-gray-200 py-1">
                    Complete box
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default product;
