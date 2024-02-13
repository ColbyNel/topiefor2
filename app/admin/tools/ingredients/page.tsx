import AddIngredientDialog from "@/components/AddIngredientDialog";
import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";
import IngredientsList from "@/components/IngredientsList";


const ingredients = () => {
  return (
    <>
      <AdminHead />
      <div className="admin-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <IngredientsList />
        <a
          className="inline-block rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700"
          href="/admin/tools/customermgmt"
        >
          Add Ingredient
        </a>
        <a
          className="inline-block rounded border bg-slate-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white  active:bg-slate-800"
          href="/admin/tools/ingredients"
        >
          Back
        </a>
      </div>
      <div className="flex justify-center -m-60 gap-4">
      <AddIngredientDialog />

        </div>
    </>
  );
};
export default ingredients;



