// "use client"
import React from "react";
import { deleteCustomer, getSingleCustomer } from "@/actions";
import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";


export default async function SinglePage({ params: { customerIDNo } }: any) {
  // const getSingleCustomer = async (customerId: string) => {
  //   const req = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/customers/get/${customerId}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       next: {
  //         revalidate: 60,
  //         tags: ["customers" + customerId],
  //       },
  //     }
  //   );
  //   return await req.json();
  // };


  const customer = await getSingleCustomer(customerIDNo);
  const address:String = (customer?.addressOne || '') + ' ' + (customer?.addressTwo || '') + ', ' + (customer?.city || '') + ', ' + (customer?.zip || '')
  const date:String = (customer?.joinDate?.dayOfMonth || '') + ' ' + (customer?.joinDate?.month) + ' ' + (customer?.joinDate?.year)
  // const getAllOrders = async (customerIDNo) =>{
  //   const req = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/`
  //   )
  // }


  // const [editMode, setEditMode] = useState(false);
  // const [formData, setFormData] = useState({
  //   customerName: customer?.customerName,
  //   customerIDNo: customer?.customerIDNo,
  //   customerEmail: customer?.email,
  //   customerPhoneNo: customer?.phoneNumber,
  // })

  const editMode = false;
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
              <h3 className="text-4xl font-semibold leading-7 text-primary ">
                Customer Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-primary">
                Personal details
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {editMode ? (
                  <>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {customer.customerName}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Id/Passport Number
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {customer.customerIDNo}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {customer.email}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Telephone No.
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {customer.phoneNumber}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Address Line 1
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {customer.addressOne}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Address Line 2
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {customer.addressTwo}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        City
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {customer.city}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Zip Code
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {customer.zip}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Comment
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {customer.comment}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Customer since
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {customer.joinDate}
                      </dd>
                    </div>
                    <div className="px-4 py-6 flex justify-center space-x-4 ">
                      <a className="inline-block rounded bg-secondary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-green-900">
                        Edit Customer
                      </a>
                      <a
                        className="inline-block rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700"
                        href="/admin/tools/customermgmt"
                      >
                        Delete Customer
                      </a>
                      <a
                        className="inline-block rounded border bg-slate-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white  active:bg-slate-800"
                        href="/admin/tools/customermgmt"
                      >
                        Back
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <form
                        action={async (data: FormData) => {
                          "use server";
                          const cusName = data.get("customerName");
                          fetch("", {
                            method: "UPDATE",
                            body: JSON.stringify({ data }),
                          });
                        }}
                      >
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-base font-medium leading-6 text-primary">
                            Full name
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0">
                            <input
                              placeholder={customer.customerName}
                              type="text"
                              name="customerName"
                              className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                            />
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-base font-medium leading-6 text-primary">
                            Id/Passport Number
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 ">
                            <input
                              placeholder={customer.customerIDNo}
                              type="text"
                              name="customerIDNo"
                              className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                            />
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-base font-medium leading-6 text-primary">
                            Email address
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              placeholder={customer.email}
                              type="text"
                              name="email"
                              className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                            />
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-base font-medium leading-6 text-primary">
                            Telephone No.
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              placeholder={customer.phoneNumber}
                              type="text"
                              name="phoneNumber"
                              className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                            />
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-base font-medium leading-6 text-primary">
                            Address Line 1
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              placeholder={customer.addressOne}
                              type="text"
                              name="addressOne"
                              className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                            />
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-base font-medium leading-6 text-primary">
                            Address Line 2
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              placeholder={customer.addressTwo}
                              type="text"
                              name="addressTwo"
                              className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                            />
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-base font-medium leading-6 text-primary">
                            City
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              placeholder={customer.city}
                              type="text"
                              name="city"
                              className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                            />
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-base font-medium leading-6 text-primary">
                            Zip Code
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              placeholder={customer.zip}
                              type="text"
                              name="zip"
                              className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                            />
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-base font-medium leading-6 text-primary">
                            Comment
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <input
                              placeholder={customer.comment}
                              type="text"
                              name="comment"
                              className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                            />
                          </dd>
                        </div>
                      </form>

                      <div className="px-4 py-6 flex justify-center space-x-4 ">
                        <a
                          className="inline-block rounded bg-secondary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-green-900"
                          // onClick={() => setEditMode(!editMode)}
                        >
                          Submit
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
                          // onClick={() => deleteCustomer(customer.customerIDNo)}
                        >
                          Back
                        </a>
                      </div>
                    </dl>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



