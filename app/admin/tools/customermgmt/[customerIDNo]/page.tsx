import React from "react";
import { deleteCustomer, getSingleCustomer } from "@/actions";
import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";

export default async function SinglePage({ params: { customerIDNo } }) {

  const customer = await getSingleCustomer(customerIDNo);
  const address:String = (customer?.addressOne || '') + ' ' + (customer?.addressTwo || '') + ', ' + (customer?.city || '') + ', ' + (customer?.zip || '')
  const date:String = (customer?.joinDate?.dayOfMonth || '') + ' ' + (customer?.joinDate?.month) + ' ' + (customer?.joinDate?.year)

  // const getAllOrders = async (customerIDNo) =>{
  //   const req = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/`
  //   )
  // }


  return (
    <>
      <AdminHead />
      <div className="admin-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-content">
          <div className="bg-white flex min-h-screen flex-1 flex-col px-6 py-12 lg:px-8">
            <div className="px-4 sm:px-0">
              <h3 className="text-4xl font-semibold leading-7 text-secondary ">
                Customer Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
                Personal details
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.customerName}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Id/Passport Number
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.customerIDNo}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.email}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Telephone No.
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {customer.phoneNumber}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Delivery Address
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {address}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Customer since
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {date}
                  </dd>
                </div>
                <div className="px-4 py-6 flex justify-center space-x-4 ">
                  <a
                    className="inline-block rounded bg-secondary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-green-900"
                    href="#"
                  >
                    Edit Customer
                  </a>
                  <a
                    className="inline-block rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700"
                    href="/admin/tools/customermgmt"
                    // onClick={deleteCustomer(customer.customerIDNo)}
                  >
                    Delete Customer
                  </a>
                  <a
                    className="inline-block rounded border bg-slate-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white  active:bg-slate-800"
                    href="/admin/tools/customermgmt"
                    // onClick={deleteCustomer(customer.customerIDNo)}
                  >
                    Back
                  </a>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
