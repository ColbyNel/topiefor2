import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";
import ChartThree from "@/components/ChartThree";

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
        <ChartThree />
        </div>
      </div>
    </>
    )
}
export default analytics;