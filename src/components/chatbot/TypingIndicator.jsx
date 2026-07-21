export default function TypingIndicator() {
  return (
    <div className="flex gap-1 px-4 py-2">
      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
      <span
        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: ".15s" }}
      ></span>
      <span
        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: ".3s" }}
      ></span>
    </div>
  );
}