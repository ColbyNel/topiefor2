
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
          
        </div>
        
      </div>
    </>
  );
};
export default customermgmt;
