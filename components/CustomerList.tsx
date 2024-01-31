import { getAllCustomers } from "@/actions";
import Link from "next/link";

// const customer = await getSinlgeCustomer("9876543");
// const name = customer?.name;
// const id = customer?.customerIDNo;
// const emailAddress = customer?.emailAddress;

const allCustomers = await getAllCustomers();

const customerlist = () => {
  return (
    <>
      <div className="bg-white flex min-h-screen flex-1 flex-col px-6 py-12 lg:px-8">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-10 pt-24 ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 pl-10 ">
              All Customers
            </h1>
          </div>
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
                  Customer Since
                </th>
              </tr>
            </thead>
            <tbody>
              {allCustomers.map(
                ({
                  id,
                  customerIDNo,
                  customerName,
                  phoneNumber,
                  addressOne,
                  addressTwo,
                  city,
                  zip,
                  email,
                  joinDate,
                }: any) => (
                  <tr
                    key={id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <Link href={`/admin/tools/customermgmt/${id}`}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 hover:to-blue-500 whitespace-nowrap dark:text-white"
                      >
                        {customerName}
                      </th>
                    </Link>
                    <td className="px-6 py-4">{customerIDNo}</td>

                    <td className="px-6 py-4">{email}</td>
                    <td className="px-6 py-4">{phoneNumber}</td>
                    <td className="px-6 py-4">
                      {addressOne} {addressTwo}, {city}, {zip}
                    </td>
                    <td className="px-6 py-4">
                      {joinDate?.dayOfMonth} {joinDate?.month} {joinDate?.year}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default customerlist;
