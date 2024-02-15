"use client";
const successful = () => {
  return (
    <div
      role="alert"
      className="rounded-xl border-b border-gray-100 bg-white p-4"
    >
      <div className="flex items-start gap-4">
        <span className="text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>

        <div className="flex-1">
          <strong className="block font-medium text-gray-900">
            {" "}
            Login Succesful{" "}
          </strong>
        </div>
        
      </div>
      <div className="flex justify-center mt-5 font-bold text-sm">
          <a href="/admin/tools" className="border rounded-lg bg-primary p-4 text-white button-hover">Let's get going</a>
        </div>
    </div>
  );
};
export default successful;
