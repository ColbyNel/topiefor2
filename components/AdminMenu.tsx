const AdminMenu = () => {
  return (
   
    <ul className="space-y-2 ">
      <li>
        <a
          href="/admin/tools/analytics"
          className="block rounded-lg bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Dashboard
        </a>
      </li>
  
      <li>
        <a
          href="/admin/tools/orders"
          className="block rounded-lg px-6 py-3 text-sm font-medium text-gray-600 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:text-gray-700 hover:scale-105"
        >
          Orders
        </a>
      </li>
  
      <li>
        <a
          href=""
          className="block rounded-lg px-6 py-3 text-sm font-medium text-gray-600 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:text-gray-700 hover:scale-105"
        >
          Edit Products
        </a>
      </li>
  
      <li>
        <a
          href="/admin/tools/ingredients"
          className="block rounded-lg px-6 py-3 text-sm font-medium text-gray-600 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:text-gray-700 hover:scale-105"
        >
          Ingredients
        </a>
      </li>
  
      <li>
        <a
          href="/admin/tools/customermgmt"
          className="block rounded-lg px-6 py-3 text-sm font-medium text-gray-600 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:text-gray-700 hover:scale-105"
        >
          Manage Customers
        </a>
      </li>
    </ul>
 
  );
};
export default AdminMenu;
