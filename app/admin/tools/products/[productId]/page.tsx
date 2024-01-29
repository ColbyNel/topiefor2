import { getCategoryNameById, getProductById } from "@/actions";
import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";

export default async function SinglePage({ params: {productId}}:any) {

    const product = await getProductById(productId)

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
                Product
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
                All information
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {product.name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {product.description}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Nutrient Info
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {product.nutrientInformation}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Warnings!
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {product.warnings}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Category
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {getCategoryNameById(product.categoryID)}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Food Cost
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {product.foodCost}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-base font-medium leading-6 text-secondary">
                    Time Cost
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {product.timeCost}
                  </dd>
                </div>
                <div className="px-4 py-6 flex justify-center space-x-4 ">
                  <a
                    className="inline-block rounded bg-secondary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-green-900"
                    href="#"
                  >
                    Edit Product
                  </a>
                  <a
                    className="inline-block rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700"
                    href="/admin/tools/customermgmt"
                    // onClick={deleteCustomer(customer.customerIDNo)}
                  >
                    Delete Product
                  </a>
                  <a
                    className="inline-block rounded border bg-slate-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white  active:bg-slate-800"
                    href="/admin/tools/products"
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
};
