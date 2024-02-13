"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditSuccess from "./EditSuccess";
import { useState } from "react";
import EditSuccessProduct from "./EditSuccessProduct";

interface FormData {
  categoryID: number;
//   picture: ;
  description: string;
  foodCost: number;
  name: string;
  nutrientInformation: string;
  price: number;
  timeCost: number;
  warnings: string;
}

const AddProductDialog = () => {
  const [formData, setFormData] = useState<FormData>({
    categoryID: 0,
    // picture: null,
    description: "",
    foodCost: 0,
    name: "",
    nutrientInformation: "",
    price: 0,
    timeCost: 0,
    warnings: "",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/add_product`,
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
      <DialogTrigger className="rounded border border-green-600 px-8 py-4 text-sm font-medium text-green-600 transition hover:scale-110 hover:shadow-xl active:text-white active:border-white active:bg-green-600">
        Create New
      </DialogTrigger>
      <DialogContent className="flext justify-center border rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-xl font-bold">
            Create New Product
          </DialogTitle>
          <DialogDescription>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <form action="" onSubmit={onSubmit} className="flex-row">
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-primary">
                      Category ID
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0  ml-7">
                      <input
                        placeholder="1"
                        type="number"
                        name="categoryID"
                        max="3"
                        min="1"
                        value={formData.categoryID}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  {/* <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-primary">
                      Comment
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0">
                      <input
                        placeholder="Additional information"
                        type="text"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div> */}

                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-primary">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0  ml-7">
                      <input
                        placeholder="description"
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-primary">
                      Food Cost
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0  ml-7">
                      <input
                        placeholder="10"
                        type="number"
                        name="foodCost"
                        value={formData.foodCost}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-primary">
                      Name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0  ml-7">
                      <input
                        placeholder="Product Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-primary ">
                      Nutrient<br/> Information
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0 ml-7">
                      <input
                        placeholder=""
                        type="text"
                        name="nutrientInformation"
                        value={formData.nutrientInformation}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-primary">
                      Price
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0  ml-7">
                      <input
                        placeholder="20"
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-primary">
                      Time Cost
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0  ml-7">
                      <input
                        placeholder="5"
                        type="text"
                        name="timeCost"
                        value={formData.timeCost}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-primary">
                      Warnings
                    </dt> 
                    <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0  ml-7">
                      <input
                        placeholder="Dietry restrictions"
                        type="text"
                        name="warnings"
                        value={formData.warnings}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-primary bg-gray-100 p-2"
                      />
                    </dd>
                  </div>

                  {success ? (
                    <EditSuccessProduct />
                  ) : (
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
export default AddProductDialog;
