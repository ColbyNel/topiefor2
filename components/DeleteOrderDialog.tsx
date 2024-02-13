"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import EditSuccess from "./EditSuccess";
import DeleteSuccess from "./DeleteSuccess";

const deleteOrder = async (orderId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/delete/${orderId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["orders", "deleteOrders"],
      },
    }
  );
  return response.text();
};

const DeleteOrderDialog = ({ id }: any) => {
  const [confirmation, setConfirmation] = useState(false);
  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(id);
      // Optionally, you can perform additional actions after successful deletion
      setConfirmation(true);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="inline-block rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700">
        Delete Order
      </DialogTrigger>
      <DialogContent className="border rounded-xl p-5">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-3xl font-bold text-red-500">
            Are you sure?
          </DialogTitle>
          <DialogDescription className="flex flex-col justify-center px-10 mt-5 font-bold text-black">
            This action is permanent and cannot be undone
            {confirmation ? (
              <div className="mt-5">
                <DeleteSuccess />
              </div>
            ) : (
              <div className="flex justify-center mt-5">
                <button
                  onClick={handleDeleteOrder}
                  className="rounded border border-primary bg-red-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700"
                >
                  Delete Order
                </button>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteOrderDialog;
