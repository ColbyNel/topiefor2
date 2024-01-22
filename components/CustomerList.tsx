import { getAllCustomers, getSinlgeCustomer } from "@/actions";
import Link from "next/link";

// const customer = await getSinlgeCustomer("9876543");
// const name = customer?.name;
// const id = customer?.customerIDNo;
// const emailAddress = customer?.emailAddress;

const allCustomers = await getAllCustomers();


const customerlist = () => {
  return (
    <div className="bg-gray-500 flex min-h-screen flex-1 flex-col px-6 py-12 lg:px-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-center text-white pb-10 text-4xl ">All Customers</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                ID Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Telephone No.
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Address
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            {allCustomers.map(({ customerIDNo, name, emailAddress, telephoneNumber, addressID, title}) => (
            <tr key ={customerIDNo} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <Link href="/admin/tools/customermgmt/customer">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 hover:to-blue-500 whitespace-nowrap dark:text-white">
                    {name}
                </th>
                </Link>
                <td className="px-6 py-4">
                    {customerIDNo}
                </td>
                <td className="px-6 py-4">
                    {emailAddress}
                </td>
                <td className="px-6 py-4">
                    {telephoneNumber}
                </td>
                <td className="px-6 py-4">
                    {addressID}
                </td>
                <td className="px-6 py-4">
                    {title}
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default customerlist;
