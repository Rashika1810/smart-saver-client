import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User } from "lucide-react";

export default function ChatMessage({ message }) {
  const mine = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 mb-4 ${
        mine ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant Avatar */}
      {!mine && (
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
          <Bot size={16} />
        </div>
      )}

      {/* Message */}
      <div
        className={`max-w-[78%] rounded-xl px-4 py-3 text-sm leading-6 ${
          mine
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
        }`}
      >
        {mine ? (
          <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
          <div
            className="
              prose prose-sm max-w-none
              prose-p:my-2
              prose-ul:my-2
              prose-ol:my-2
              prose-li:my-1
              prose-headings:mt-4
              prose-headings:mb-2
              prose-headings:font-semibold
              prose-strong:text-gray-900
              prose-code:bg-gray-100
              prose-code:px-1
              prose-code:py-0.5
              prose-code:rounded
              prose-pre:bg-gray-900
              prose-pre:text-gray-100
              prose-a:text-blue-600
              prose-a:no-underline
              prose-blockquote:border-l-4
              prose-blockquote:border-gray-300
              prose-blockquote:pl-4
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {mine && (
        <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center flex-shrink-0">
          <User size={16} />
        </div>
      )}
    </div>
  );
}