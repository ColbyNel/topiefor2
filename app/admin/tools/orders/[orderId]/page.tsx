// "use client"
import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";
import DeleteOrderDialog from "@/components/DeleteOrderDialog";
import EditOrderDialog from "@/components/EditOrderDialog";
// import { useState } from "react";

const getOrderById = async (orderId: any) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/get_order/${orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 10,
        tags: ["orders", "orderbyid"],
      },
    }
  );
  return await req.json();
};

const getMyOrder = async (id: number) => {
  const thisOrder = await getOrderById(id);
  return thisOrder;
};

export default async function SinglePage({ params: { orderId } }: any) {
  const order = await getOrderById(orderId);
  // console.log(order)

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
                Order Information
              </h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {/* {Object.entries(editedOrder).map(([key, value]) => (
                  <div
                    key={key}
                    className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                  >
                    <dt className="text-base font-medium leading-6 text-secondary">
                      {key}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {editable ? (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleFieldChange(key, e.target.value)
                          }
                          className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-primary"
                        />
                      ) : (
                        <span>{value}</span>
                      )}
                    </dd>
                  </div>
                ))} */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Order ID
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {orderId}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Amount
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    R{order.amount}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Comment
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.comment}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Date Placed
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.datePlaced.dayOfMonth} {order.datePlaced.month}{" "}
                    {order.datePlaced.year} - {order.datePlaced.hour}:
                    {order.datePlaced.minute}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Pickup Time
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.pickupTime.dayOfMonth} {order.pickupTime.month}{" "}
                    {order.pickupTime.year} - {order.pickupTime.hour}:
                    {order.pickupTime.minute}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Status
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.status}
                  </dd>
                </div>
                <div className="px-4 py-6 flex justify-center space-x-4 ">
                  <EditOrderDialog id={orderId} />
                  <DeleteOrderDialog id={orderId} />
                  <a
                    className="inline-block rounded border bg-slate-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white  active:bg-slate-800"
                    href="/admin/tools/orders"
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
