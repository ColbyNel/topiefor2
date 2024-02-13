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
interface FormData {
  name: string;
  pricePerKG: string;
  note: string;
  quantity: number;
  unitID: number;
}

const AddIngredientDialog = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    pricePerKG: "",
    note: "",
    quantity: 0,
    unitID: 1,
  });

  const [success, setSuccess] = useState(false); 

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ingredients/add_ingredient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      
      if (response.ok) {
        setSuccess(true);
      } 
      

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "quantity" || name === "unitID" ? parseInt(value, 10) : value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700">
        Add Ingredient
      </DialogTrigger>
      <DialogContent className="border rounded-lg p-10">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-3xl font-bold ">
            Add Ingredient
          </DialogTitle>
          <DialogDescription className="flex flex-col justify-center">
            
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <form action="" onSubmit={onSubmit}>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-base font-medium leading-6 text-primary">
                      Name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0">
                      <input
                        placeholder="Ingredient Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-base font-medium leading-6 text-primary">
                      Price per KG
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0">
                      <input
                        placeholder="25.00"
                        type="text"
                        name="pricePerKG"
                        value={formData.pricePerKG}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-base font-medium leading-6 text-primary">
                      Notes
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0">
                      <input
                        placeholder="Additional Comments"
                        type="text"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-base font-medium leading-6 text-primary">
                      Quantity (KG)
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0">
                      <input
                        placeholder="25"
                        type="number"
                        min={1}
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-base font-medium leading-6 text-primary">
                      Unit ID
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0">
                      <input
                        placeholder="1"
                        type="number"
                        max={2}
                        min={1}
                        name="unitID"
                        value={formData.unitID}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>
                  {success ? (<EditSuccess/>):(
                  <div className="flex justify-center mt-5">
                    <button
                      type="submit"
                      className="rounded border border-primary px-8 py-3 text-sm font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white active:border-red-700 active:bg-red-700"
                    >
                      Submit
                    </button>
                    
                  </div>
                  )}
                </form>
              </dl>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default AddIngredientDialog;
