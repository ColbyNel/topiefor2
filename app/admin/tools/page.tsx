import { CustomButton } from "@/components";

const admintools = () => {
  return (
    <div>
      <div className="bg-gray-500 flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 text-center  leading-9 tracking-tight">
          <div className="mb-4 ">
            <img
              className="inline-block w-100 h-100"
              src="https://img.icons8.com/ios/100/FFFFFF/omnichannel.png"
              alt="omnichannel"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Welcome to Admin Tools
          </h1>
          <p className="text-white">
            Your one stop management shop for To Pie For
          </p>
          <div id="buttons" className="flex flex-col items-center justify-center mt-10">
            <a
              className=" my-2 inline-flex items-center gap-2 rounded border border-primary bg-primary px-8 py-3 text-white hover:bg-red-900 hover:text-white focus:outline-none  active:text-black"
              href="/admin/tools/orders"
            >
              <span className="text-sm font-medium"> Orders </span>

              <svg
                className="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              className=" my-2 inline-flex items-center gap-2 rounded border border-primary bg-primary px-8 py-3 text-white hover:bg-red-900 hover:text-white focus:outline-none focus:ring active:text-black"
              href="/admin/tools/analytics"
            >
              <span className="text-sm font-medium"> Analytics </span>

              <svg
                className="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              className="my-2 inline-flex items-center gap-2 rounded border border-primary bg-primary px-8 py-3 text-white hover:bg-red-900 hover:text-white focus:outline-none focus:ring active:text-black"
              href="/download"
            >
              <span className="text-sm font-medium"> Edit Products </span>

              <svg
                className="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              className="my-2 inline-flex items-center gap-2 rounded border border-primary bg-primary px-8 py-3 text-white hover:bg-red-900 hover:text-white focus:outline-none focus:ring active:text-black"
              href="/download"
            >
              <span className="text-sm font-medium"> Ingredients </span>

              <svg
                className="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              className="my-2 inline-flex items-center gap-2 rounded border border-primary bg-primary px-8 py-3 text-white hover:bg-red-900 hover:text-white focus:outline-none focus:ring active:text-black"
              href="/admin/tools/customermgmt"
            >
              <span className="text-sm font-medium"> Manage Customers </span>

              <svg
                className="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default admintools;
