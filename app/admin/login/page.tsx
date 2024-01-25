import Link from "next/link";

export default function AdminLogin() {
  return (
    

    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-primary">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/cake_FILL0_wght400_GRAD0_opsz24.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Welcome Admin!!!
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-tertiary hover:text-teal-950">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiary sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Link href="/admin/tools">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}
