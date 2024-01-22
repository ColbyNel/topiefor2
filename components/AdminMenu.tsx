const AdminMenu = () => {
  return (
    <ul className="space-y-1">
      <li>
        <a
          href="/admin/tools/analytics"
          className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
        >
          Dashboard
        </a>
      </li>

      <li>
        <a
          href="/admin/tools/orders"
          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Orders
        </a>
      </li>

      <li>
        <a
          href=""
          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Edit Products
        </a>
      </li>

      <li>
        <a
          href=""
          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Ingredients
        </a>
      </li>

      <li>
        <a
          href="/admin/tools/customermgmt"
          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Manage Customers
        </a>
      </li>
    </ul>
  );
};
export default AdminMenu;
