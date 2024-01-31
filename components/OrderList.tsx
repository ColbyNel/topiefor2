import { getAllOrders } from "@/actions";
import Link from "next/link";

const allOrders = await getAllOrders();

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
                Pick Up Time
              </th>
              <th scope="col" className="px-6 py-3">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map(
              ({
                id,
                customerID,
                amount,
                status,
                datePlaced,
                pickupTime,
              }: any) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 hover:to-blue-500 whitespace-nowrap dark:text-white"
                  >{id}</th>
                  
                  <td className="px-6 py-4">{customerID}</td>
                  <td className="px-6 py-4">R{amount}</td>
                  <td className="px-6 py-4">{datePlaced?.dayOfMonth} {datePlaced?.month} {datePlaced?.year} - {datePlaced?.hour}:{pickupTime?.minute} </td>
                  <td className="px-6 py-4">{pickupTime?.dayOfMonth} {pickupTime?.month} {pickupTime?.year} - {pickupTime?.hour}:{pickupTime?.minute} </td>
                  <td className="px-6 py-4">{status}</td>
                  <td className="px-6 py-4">
                    <a href={`/admin/tools/orders/${id}`} className="mr-5 px-3 py-2 rounded border border-secondary bg-secondary text-sm font-medium text-white hover:bg-transparent hover:text-secondary focus:outline-none active:text-green-600" >
                        Edit
                    </a>
                    <a 
                    className="px-3 py-2 rounded border border-primary bg-primary text-sm font-medium text-white hover:bg-transparent hover:text-primary focus:outline-none active:text-red-700" href="/admin/tools/orders">
                        Delete
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
export default orderlist;
