import { useState } from "react";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";

export default function LoaderDemo() {
  const [loading, setLoading] = useState(false);

  const simulateLoading = (time) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, time);
  };

  return (
    <>
      {loading && <Loader />}

      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h1 className="text-4xl font-semibold text-gray-900">
            Top Loader Demo
          </h1>

          <p className="mt-3 text-gray-500">
            Test your horizontal loader animation with different loading times.
          </p>

          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap gap-4">
              <Button
                variant="info"
                onClick={() => simulateLoading(1000)}
              >
                1 Second
              </Button>

              <Button
                variant="info"
                onClick={() => simulateLoading(2000)}
              >
                2 Seconds
              </Button>

              <Button
                variant="info"
                onClick={() => simulateLoading(5000)}
              >
                5 Seconds
              </Button>

              <Button
                variant="danger"
                onClick={() => setLoading(false)}
              >
                Stop Loader
              </Button>
            </div>

            <div className="mt-10 rounded-lg border border-dashed border-gray-300 p-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Dummy Content
              </h2>

              <p className="mt-3 text-gray-600">
                While the loader is active, you can scroll this page to see how
                it looks over real content. This mimics the appearance of your
                SmartSaver application.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-4 h-10 w-10 rounded-lg bg-blue-100"></div>

                    <div className="mb-2 h-4 w-32 rounded bg-gray-200"></div>

                    <div className="h-3 w-full rounded bg-gray-100"></div>

                    <div className="mt-2 h-3 w-2/3 rounded bg-gray-100"></div>
                  </div>
                ))}
              </div>

              <div className="mt-12 h-[700px] rounded-lg border border-gray-200 bg-gradient-to-b from-white to-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}