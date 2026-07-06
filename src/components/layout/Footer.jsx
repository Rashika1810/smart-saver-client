export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Smart Saver. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-400">
          <button className="transition hover:text-white">Privacy</button>

          <button className="transition hover:text-white">Terms</button>

          <button className="transition hover:text-white">Support</button>
        </div>
      </div>
    </footer>
  );
}
