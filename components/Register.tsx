import React from "react";

const Register = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="bg-primary rounded-t-lg border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-extrabold text-lg p-5 text-white dark:text-white text-center ">
              Join our family
            </h3>
          </div>
          <form action="#" className="p-20">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
  
              <div className="w-full pb-6 xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
  
            <div className="mb-4.5 pb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Email <span className="text-meta-1">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
  
            <div className="mb-4.5 pb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Address Line 1
              </label>
              <input
                type="text"
                placeholder="Address Line 1"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
  
            <div className="mb-4.5 pb-6">
              <label className="mb-2.5 block text-black dark:text-white">
              Address Line 2
              </label>
              <input
                type="text"
                placeholder="Address Line 2"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
  
            <div className="mb-4.5 pb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
  
            <div className="mb-4.5 pb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Password
              </label>
              <input
                type="text"
                placeholder="Minimum 8 characters"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
  
            <div className="mb-4.5 pb-8">
              <label className="mb-2.5 block text-black dark:text-white">
                Confirm Password
              </label>
              <input
                type="text"
                placeholder="Confirm password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
  
            <button className="button-hover flex w-full justify-center rounded bg-primary p-3 font-medium text-white">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };
  export default Register;