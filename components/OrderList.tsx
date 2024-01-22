import Link from "next/link";

const orderlist = () => {
  return (
    <div className="bg-white flex min-h-screen flex-1 flex-col px-6 py-12 lg:px-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="item-hover odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 hover:to-blue-500 whitespace-nowrap dark:text-white"
              >
                956487854
              </th>

              <td className="px-6 py-4">0123456789</td>
              <td className="px-6 py-4">R195</td>
              <td className="px-6 py-4">18 January 2024</td>
              <td className="px-6 py-4">Delivered</td>
            </tr>

            <tr className=" item-hover odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <Link href="/admin/tools/customermgmt/customer">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 hover:to-blue-500 whitespace-nowrap dark:text-white"
                >
                  84568679
                </th>
              </Link>
              <td className="px-6 py-4">0123456789</td>
              <td className="px-6 py-4">R59</td>
              <td className="px-6 py-4">21 January 2024</td>
              <td className="px-6 py-4">Placed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default orderlist;
