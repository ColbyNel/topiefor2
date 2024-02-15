import AddIngredientDialog from "@/components/AddIngredientDialog"
import AdminHead from "@/components/AdminHead"
import AdminMenu from "@/components/AdminMenu"
import OrderFilter from "@/components/OrderFilter"
import OrderList from "@/components/OrderList"
import ProductList from "@/components/ProductList"

const products = () => {
    return(
        <>
        <AdminHead />
      <div className="admin-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-content">
          <ProductList  />
          
        </div>
      </div>
        </>
    )
}
export default products