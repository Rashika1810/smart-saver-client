import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot } from "lucide-react";

export default function ChatMessage({ message }) {
  const mine = message.role === "user";

  const [userInitial, setUserInitial] = useState("U");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user?.name) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserInitial(user.name.charAt(0).toUpperCase());
      }
    }
  }, []);

  return (
    <div
      className={`mb-4 flex items-start gap-3 ${
        mine ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant Avatar */}
      {!mine && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Bot size={16} />
        </div>
      )}

      {/* Message */}
      <div
        className={`max-w-[78%] rounded-xl px-4 py-3 text-sm leading-6 ${
          mine
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-bl-md border border-gray-200 bg-white text-gray-800"
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
              prose-code:rounded
              prose-code:bg-gray-100
              prose-code:px-1
              prose-code:py-0.5
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
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold text-white">
          {userInitial}
        </div>
      )}
    </div>
  );
}