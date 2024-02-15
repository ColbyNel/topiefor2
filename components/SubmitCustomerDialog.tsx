"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface customerForm {
    id: number;
    customerName: string;
    customerIDNo: number;
    phoneNumber: string;
    addressOne: string;
    addressTwo: string;
    city: string;
    zip: string;
    comment: string;
    email: string;
  }

const updateCustomer = async (formData:customerForm,customerId:number) => {
    const req:Response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers/update/${customerId}`,
        {
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData),
        }
    );
    return req.text();
}



const SubmitCustomerDialog = ({formData}:any) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleClick = () =>{

  }



  return (
    <Dialog>
      <DialogTrigger className="inline-block rounded bg-secondary px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-green-900">
        Submit
      </DialogTrigger>
      <DialogContent className="p-10 border rounded-lg flex flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold p-3">Are you sure?</DialogTitle>
          <DialogDescription className="flex flex-col justify-center p-5 mt-5">
            <button type="submit" className="flex rounded bg-secondary mb-5 px-5 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:bg-green-900">
              Submit
            </button>
            <button className="flex rounded border bg-slate-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white  active:bg-slate-800">
              Back
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default SubmitCustomerDialog;
