export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Smart Saver. All rights reserved.
        </p>

        <div className="flex gap-4 mt-3 md:mt-0 text-sm text-gray-400">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span className="hover:text-white cursor-pointer">Support</span>
        </div>

      </div>
    </footer>
  );
}