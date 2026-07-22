export default function Loader() {
  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-1.5">
      <div className="relative h-full overflow-hidden">
        <div className="absolute h-full w-[90%] animate-top-loader rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.55)]" />
      </div>
    </div>
  );
}