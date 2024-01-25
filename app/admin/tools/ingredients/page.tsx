import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";
import IngredientsList from "@/components/IngredientsList"

const ingredients = () => {
  return (
    <>
      <AdminHead />
      <div className="admin-container">
        <div className="admin-sidebar">
      <AdminMenu />
      </div>
      <IngredientsList />
      </div>
    </>
  );
};
export default ingredients;
