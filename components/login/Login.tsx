"use client";
import { validateLogin } from "@/actions";
import Failed from "@/components/login/Failed";
import Successful from "@/components/login/Successful";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MyFormData {
  email: string;
  password: string;
}

export default function Example() {
    const pathname = usePathname();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [formData, setFormData] = useState<MyFormData>({
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
      const response = await validateLogin(formData);
      if (response == "Login successful!") {
        setLoginSuccess(true);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error during login validation:");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-lg border border-stroke border-primary bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke rounded-t-lg bg-primary py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-white dark:text-white text-center">
            Log In
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-10">
          <div className="mb-4.5 pb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="mt-5 mb-5.5 flex items-center justify-between pb-5">
            <p className="">Not a member?</p>

            <a href="/register" className="text-sm text-primary">
              Sign Up
            </a>
          </div>

          <button
            type="submit"
            className="button-hover flex w-full justify-center rounded bg-primary p-3 font-medium text-white"
          >
            Log In
          </button>
          <Link href={pathname}>
          <button
            type="button"
            className="button-hover flex w-full justify-center rounded bg-transparent p-3 mt-3 -mb-9 font-medium text-primary"
          >
            Close
          </button>
          </Link>
        </form>
        {!loginSuccess && <Failed />}
        {loginSuccess && <Successful />}
      </div>
    </div>
  );
}