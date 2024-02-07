import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface PopupProps {
  button: boolean;
}

interface RegisterFormData {
  customerName: string;
  customerIDNo: string;
  phoneNumber: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  zip: string;
  email: string;
  password: string;
}

const signUp = async (formData: RegisterFormData) => {
  const req: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customers/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(formData),
    }
  );
  console.log(JSON.stringify(formData))
  const responseData = await req;
  return responseData.text();
};

const SignUpDialog: React.FC<PopupProps> = ({ button }) => {
  const [registerSuccess, setRegisterSucces] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    customerName: "",
    customerIDNo: "",
    phoneNumber: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    zip: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      if (response == "Signup successful!") {
        setRegisterSucces(true);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <Dialog>
      {button ? (
      <DialogTrigger className="text-white hover:text-secondary button-hover rounded-md px-3 py-2 text-sm font-medium ">
        Sign Up
      </DialogTrigger>
      ): (
        <DialogTrigger className="button-hover rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ">
          Sign Up
        </DialogTrigger>
      )
      }
      <DialogContent className="border rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex justify-center pt-5 text-5xl font-chicle">
            Sign Up
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="p-9 mb-6">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    ID/Passport Number
                  </label>
                  <input
                    type="text"
                    name="customerIDNo"
                    value={formData.customerIDNo}
                    onChange={handleInputChange}
                    placeholder="ID or Passport Number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="w-full pb-6 xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4.5 pb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email <span className="text-meta-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5 pb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressOne"
                  value={formData.addressOne}
                  onChange={handleInputChange}
                  placeholder="Address Line 1"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5 pb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressTwo"
                  value={formData.addressTwo}
                  onChange={handleInputChange}
                  placeholder="Address Line 2"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5 pb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  City
                </label>
                <input
                  type="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5 pb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="Zip Code"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="flex row">
                <div className="mb-4.5 pb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Minimum 8 characters"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 pb-8 ml-5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={() => handleSubmit}
                className="button-hover flex items-center w-28 justify-center rounded bg-primary py-2  font-medium text-white"
              >
                Sign Up
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default SignUpDialog;
