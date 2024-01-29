import {
  getAllCategories,
  getAllProducts,
  getCategoryNameById,
} from "@/actions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const allProducts = async () => {
  const allProducts = await getAllProducts();
  const categories = await getAllCategories();

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
            <span key="categories" className="m-2 rounded-full bg-purple-100 px-2.5 py-0.5 text-lg text-purple-700">
              {description}
            </span>
            </a>
          ))}
          </div>
          <div className="grid grid-cols-3 gap-x-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {allProducts.map(
              ({ id, name, price, comment, description, categoryID }: any) => (
                <a
                  key={id}
                  href={`/products/${id}`}
                  className="item-hover border-black group"
                >
                  <div className="aspect-square w-100 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                    <img
                      src={comment}
                      alt={name}
                      className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
                      style={{ maxHeight: "300px" }}
                    />
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
