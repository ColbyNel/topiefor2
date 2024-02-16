"use client";
import { deleteIngredient } from "@/clientactions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import DeleteSuccess from "./DeleteSuccess";

const DeleteIngredientDialog = ({ id }: any) => {
  const [confirmation, setConfirmation] = useState(false);
  const handleDeleteIngredient = async () => {
    try {
      await deleteIngredient(id);
      setConfirmation(true);
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="mr-5 px-3 py-2 rounded border border-secondary bg-secondary text-sm font-medium text-white hover:bg-transparent hover:text-secondary focus:outline-none active:text-green-600">
        Delete
      </DialogTrigger>
      <DialogContent className="border rounded-lg p-10">
        <DialogHeader className="flex flex-col justify-center">
          <DialogTitle className="flex justify-center text-3xl font-bold">
            Are you sure?
          </DialogTitle>
          <DialogDescription className="flex items-center p-5 text-center text-xl font-bold text-red-500">
            This action cannot be undone.
            {confirmation ? (
              <div className="mt-5">
                <DeleteSuccess />
              </div>
            ) : (
              <button
                onClick={handleDeleteIngredient}
                className="flex justify-center px-3 py-2 rounded border border-red-600 bg-red-600 text-lg font-medium text-white hover:bg-transparent hover:text-secondary focus:outline-none active:text-green-600"
              >
                Confirm
              </button>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteIngredientDialog;
