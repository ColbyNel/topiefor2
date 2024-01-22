import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";

const productData = [
    {
        name:"Doughnut",
        
    }
]

const analytics = () => {
    return(
        <>
      <AdminHead />
      <div className="admin-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-content">
          
        </div>
      </div>
    </>
    )
}
export default analytics;