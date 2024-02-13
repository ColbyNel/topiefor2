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

interface ProductInfo {
  customerID: number;
  fulfilled: number;
  comment: string;
  amount: number;
  status: string;
  ID: number;
}

const EditOrderDialog = ({ id }: any) => {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/get_order/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["orders", "getOrderById"],
        },
      }

    );
    const convertResponse = await response.json()
    console.log(convertResponse)
    
    const editedProduct:ProductInfo = {
        customerID: convertResponse.customerID,
        fulfilled: convertResponse.fulfilled,
        comment: comment,
        amount: convertResponse.amount,
        status: status,
        ID: id
    }

    const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/update_order`,
        {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedProduct)
        }
    )
        // console.log(req.text())
        return req.text()
    
    
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger className="inline-block rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700">
        Edit Order
      </DialogTrigger>
      <DialogContent className="border rounded-xl p-5">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-3xl font-bold">
            Edit Order
          </DialogTitle>
          <DialogDescription className="flex flex-col justify-center px-10 mt-10">
            <form onSubmit={handleSubmit}>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-base font-medium leading-6 text-primary pr-10 mr-5">
                  Comment
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    placeholder="Additional info"
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={handleCommentChange}
                    className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                  />
                </dd>
              </div>

              <div className="flex justify-center px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-base font-medium leading-6 text-primary">
                  Change Status
                </dt>
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={handleStatusChange}
                  className="text-black flex justify-center border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                >
                  <option value="Fulfilled">Fulfilled</option>
                  <option value="Pending">Pending</option>
                  <option value="In transit">In transit</option>
                </select>
              </div>

              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default EditOrderDialog;
