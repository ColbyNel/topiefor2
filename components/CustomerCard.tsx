import { PaperClipIcon } from "@heroicons/react/20/solid";

const CustomerCard = () => {
  return (
    <div className="bg-gray-500 flex min-h-screen flex-1 flex-col px-6 py-12 lg:px-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-4xl font-semibold leading-7 text-white ">
          Customer Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">
          Personal details
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
              Marvin
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              Id/Passport Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
              12345678910
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
              marvin@toptiertech.com
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              Telephone No.
            </dt>
            <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
              0123456789
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">
              Delivery Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
              5 Banbury, Northriding, Johannesburg, 2192
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">Title</dt>
            <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
              Mr
            </dd>
          </div>
          <div className="px-4 py-6 flex justify-center space-x-4 ">
          <button className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-md font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              Edit
            </button>
            <button className="inline-flex items-center rounded-md bg-primary px-2 py-1 text-md font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              Delete
            </button>
          </div>
          
        </dl>
      </div>
    </div>
  );
};
export default CustomerCard;
