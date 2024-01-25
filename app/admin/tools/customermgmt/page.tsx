
import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";
import CustomerList from "@/components/CustomerList";

const customermgmt = () => {
  return (
    <>
      <AdminHead />
      <div className="admin-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-content">
          <CustomerList />
          <a
          className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
          // onClick={handleRefresh}
        >
          Refresh
        </a>
        </div>
        
      </div>
    </>
  );
};
export default customermgmt;
