export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-6">

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} SmartSaver. All rights reserved.
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">

          <button className="text-sm text-gray-500 hover:text-blue-600 transition">
            Privacy
          </button>

          <button className="text-sm text-gray-500 hover:text-blue-600 transition">
            Terms
          </button>

          <button className="text-sm text-gray-500 hover:text-blue-600 transition">
            Support
          </button>

        </div>

      </div>
    </footer>
  );
}