import { getCategoryNameById, getProductById } from "@/actions";
import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";
import DeleteProductDialog from "@/components/DeleteProducttDialog";

export default async function SinglePage({ params: { productId } }: any) {
  const product = await getProductById(productId);
  const editMode = true;
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
            {editMode ? (
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
                        Product ID
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0">
                        <input
                          placeholder={product.ID}
                          type="text"
                          name="ID"
                          className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                        />
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Category ID
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 ">
                        <input
                          placeholder={product.categoryID}
                          type="text"
                          name="categoryID"
                          className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                        />
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Description
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <input
                          placeholder={product.description}
                          type="text"
                          name="description"
                          className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                        />
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Food Cost
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <input
                          placeholder={product.foodCost}
                          type="text"
                          name="foodCost"
                          className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                        />
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <input
                          placeholder={product.name}
                          type="text"
                          name="name"
                          className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                        />
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Nutrient Information
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <input
                          placeholder={product.nutrientInformation}
                          type="text"
                          name="nutrientInformation"
                          className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                        />
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Picture
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <input
                          placeholder={product.picture}
                          type="text"
                          name="picture"
                          className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                        />
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Price
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <input
                          placeholder={product.price}
                          type="text"
                          name="price"
                          className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                        />
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Time Cost
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <input
                          placeholder={product.timeCost}
                          type="text"
                          name="timeCost"
                          className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                        />
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-base font-medium leading-6 text-primary">
                        Warnings
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <input
                          placeholder={product.warnings}
                          type="text"
                          name="warnings"
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
                    <DeleteProductDialog />
                    <a
                      className="inline-block rounded border bg-slate-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white  active:bg-slate-800"
                      href="/admin/tools/products "
                      // onClick={() => deleteCustomer(customer.customerIDNo)}
                    >
                      Back
                    </a>
                  </div>
                </dl>
              </div>
            ) : (
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
                    <DeleteProductDialog />
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
