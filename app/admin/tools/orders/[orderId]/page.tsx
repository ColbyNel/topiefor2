import { getOrderById } from "@/actions";
import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";

export default async function SinglePage({ params: { orderId } }: any) {
  const order = await getOrderById(orderId);

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
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Order ID
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.id}
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
                    Date Placed
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.datePlaced?.dayOfMonth} {order.datePlaced?.month}{" "}
                    {order.datePlaced?.year} - {order.datePlaced?.hour}:
                    {order.datePlaced?.minute}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Pickup Time
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.pickupTime?.dayOfMonth} {order.pickupTime?.month}{" "}
                    {order.pickupTime?.year} - {order.pickupTime?.hour}:
                    {order.pickupTime?.minute}
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
                  <a
                    className="inline-block rounded bg-secondary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-green-900"
                    href="#"
                  >
                    Edit Order
                  </a>
                  <a
                    className="inline-block rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700"
                    href="/admin/tools/customermgmt"
                    // onClick={deleteCustomer(customer.customerIDNo)}
                  >
                    Delete Order
                  </a>
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
