import { getAllProducts, getCategoryById } from "@/actions"
import { Link } from "lucide-react";

interface Category {
    categoryId: number;
    description: string;
  }

const allProducts = await getAllProducts();

const category = async (categoryid:number) => {
    const req:Category = getCategoryById(categoryid)
    return req
}

const productlist = () => {
    return(
        <div className="bg-white flex min-h-screen flex-1 flex-col px-6 py-12 lg:px-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-10 pt-24 ">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 pl-10 ">
            All Orders
          </h1>
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
                Warnings
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(
              ({
                name,
                price,
                description,
                warnings,
                nutrientInformation,
                categoryID,
                foodCost,
                timeCost
                
              }:any) => (
                <tr
                  key={name}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <Link href="">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 hover:to-blue-500 whitespace-nowrap dark:text-white"
                  >
                    {name}
                  </th>
                  </Link>
                    <td className="px-6 py-4">{price}</td>
                  
                  <td className="px-6 py-4">{description}</td>
                  <td className="px-6 py-4">{warnings}</td>
                  <td className="px-6 py-4">{nutrientInformation}</td>
                  <td className="px-6 py-4">{category(categoryID)}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
    )
}
export default productlist