import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddIngredientDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="inline-block rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700">
        Add Ingredient
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Ingredient</DialogTitle>
          <DialogDescription>
            <form action="">
              <input type="" />
              <input type="" />
              <input type="" />
              <input type="" />
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
