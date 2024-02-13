<form
  action={async (data: FormData) => {
    "use server";
    const cusName = data.get("customerName");
    fetch("", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }}
>
  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-base font-medium leading-6 text-secondary">
      Full name
    </dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <input type="text" name="customerName" />
    </dd>
  </div>

  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-base font-medium leading-6 text-secondary">
      Id/Passport Number
    </dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <input type="text" name="customerIDNo" />
    </dd>
  </div>

  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-base font-medium leading-6 text-secondary">
      Email address
    </dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <input type="text" name="email" />
    </dd>
  </div>

  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-base font-medium leading-6 text-secondary">
      Telephone No.
    </dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <input type="text" name="phoneNumber" />
    </dd>
  </div>

  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-base font-medium leading-6 text-secondary">
      Address Line 1
    </dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <input type="text" name="addressOne" />
    </dd>
  </div>

  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-base font-medium leading-6 text-secondary">
      Address Line 2
    </dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <input type="text" name="addressTwo" />
    </dd>
  </div>

  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-base font-medium leading-6 text-secondary">City</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <input type="text" name="city" />
    </dd>
  </div>

  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-base font-medium leading-6 text-secondary">Zip Code</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <input type="text" name="zip" />
    </dd>
  </div>

  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-base font-medium leading-6 text-secondary">Comment</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      <input type="text" name="comment" />
    </dd>
  </div>
</form>;

const myitem = {
  categoryID: 1,
  comment: "Cake baked by our own chefs.",
  description: "Cake that chase hunger",
  foodCost: 8.5,
  name: "Strawberry Cake",
  nutrientInformation: "fibre and calcium",
  price: 40.99,
  timeCost: 3,
  warnings: "none",
};
