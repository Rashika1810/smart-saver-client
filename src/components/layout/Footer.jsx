export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-8 py-6 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} SmartSaver. All rights reserved.
        </p>
      </div>
    </footer>
  );
}