const DeleteSuccess = () => {
    return (
      <div
        role="alert"
        className="rounded-xl border border-gray-100 bg-white p-4"
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
              Changes saved{" "}
            </strong>
  
            <p className="mt-1 text-sm text-gray-700">
              Your changes have been saved.
            </p>
          </div>
  
          <a
            className="inline-block rounded border bg-slate-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none active:text-white  active:bg-slate-800"
            href="/admin/tools/orders"
          >
            Back
          </a>
        </div>
      </div>
    );
  };
  export default DeleteSuccess;