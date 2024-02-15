import {
  deleteProduct,
  getAllProducts,
  getCategoryById,
  getCategoryNameById,
} from "@/actions";
import Link from "next/link";
import AddIngredientDialog from "./AddProductDialog";
import AddProductDialog from "./AddProductDialog";

const allProducts = await getAllProducts();

const ProductList = () => {
  return (
    <div className="bg-white flex min-h-screen flex-1 flex-col px-6 py-12 lg:px-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-10 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 pl-10">
            All Products
          </h1>
          <div className="mr-10">
            <AddProductDialog />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Product ID
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(
              ({ id, name, price, description, categoryID }: any) => (
                <tr
                  key={id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    <Link href={`/admin/tools/customermgmt/${id}`}>
                      <p className="font-medium text-gray-900 hover:to-blue-500 whitespace-nowrap dark:text-white">
                        {name}
                      </p>
                    </Link>
                  </td>
                  <td className="px-6 py-4">R{price}</td>
                  <td className="px-6 py-4">{description}</td>
                  <td className="px-6 py-4">
                    {getCategoryNameById(categoryID)}
                  </td>
                  <td className="px-6 py-4">{id}</td>
                  <td className="px-6 py-4">
                    <a
                      href={`/admin/tools/products/${id}`}
                      className="mr-5 px-3 py-2 rounded border border-secondary bg-secondary text-sm font-medium text-white hover:bg-transparent hover:text-secondary focus:outline-none active:text-green-600"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductList;
