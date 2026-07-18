import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen bg-white">
      <div className="mx-auto flex h-full max-w-7xl">
        {/* Left */}
        <div className="flex w-full justify-center overflow-y-auto lg:w-[42%]">
          <div className="w-full max-w-md px-8 py-20">
            <Outlet />
          </div>
        </div>

        {/* Right */}
        <div className="hidden h-full lg:flex lg:w-[58%] items-center justify-center border-l border-gray-200">
          <div className="w-full max-w-xl px-8">
            <div className="max-w-lg">
              <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-medium tracking-wide text-blue-700">
                PERSONAL FINANCE
              </span>

              <h2 className="mt-5 text-4xl font-semibold leading-tight text-gray-900">
                Expense Tracker
              </h2>

              <p className="mt-5 text-base leading-7 text-gray-500">
                Manage your finances with a simple and intuitive expense
                tracker. Record income and expenses, monitor spending habits,
                and gain meaningful insights to make better financial decisions.
              </p>

              <div className="mt-12 space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 h-10 w-1 rounded-full bg-blue-600" />
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      Track Expenses
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Easily record your income and expenses in one place.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 h-10 w-1 rounded-full bg-blue-600" />
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      AI Insights
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Understand your spending behavior with intelligent
                      analysis.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 h-10 w-1 rounded-full bg-blue-600" />
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      Reports & Analytics
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      View monthly summaries and visualize your financial
                      progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}