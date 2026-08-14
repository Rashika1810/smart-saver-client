export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-gray-900">
            Smart<span className="text-blue-600">Saver</span>
          </span>

          <span className="text-gray-300">•</span>

          <span className="text-xs text-gray-400">
            © {new Date().getFullYear()}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <a
            href="/about"
            className="text-xs text-gray-500 transition hover:text-gray-900"
          >
            About
          </a>

          <a
            href="https://github.com/Rashika1810"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-gray-500 transition hover:text-gray-900"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/rashika-kumari-586329230/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-gray-500 transition hover:text-blue-600"
          >
            LinkedIn
          </a>

          <span className="hidden text-xs text-gray-400 sm:inline">
            Built by Rashika Kumari
          </span>
        </div>
      </div>
    </footer>
  );
}