import { useEffect, useRef, useState } from "react";
import { X, Send, Bot } from "lucide-react";

import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({ isOpen, onClose, onSend, loading }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "How can I help with your finances today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const QUESTION_POOL = [
    "Where did I spend the most?",
    "Show my food expenses",
    "How much did I save?",
    "Can I afford a ₹20,000 phone?",
    "Show my biggest transaction",
    "Which merchant do I use the most?",
    "Give me saving tips",
    "What are my monthly expenses?",
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const shuffled = [...QUESTION_POOL].sort(() => Math.random() - 0.5);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions(shuffled.slice(0, 4));
      setShowSuggestions(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  if (!isOpen) return null;

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setShowSuggestions(false);

    const updated = [
      ...messages,
      {
        role: "user",
        text,
      },
    ];

    setMessages(updated);
    setInput("");

    const answer = await onSend(text, updated);

    if (answer) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: answer,
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className="w-[380px] h-[520px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col">
        {/* Header */}

        <div className="flex items-center justify-between px-4 py-3 border-b bg-blue-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Finance Assistant
              </h2>

              <p className="text-xs text-blue-100">Online</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Suggested Questions */}

        {showSuggestions && (
          <div className="px-4 py-3 border-b bg-white">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Suggested Questions
            </p>

            <SuggestedQuestions
              questions={suggestions}
              onSelect={sendMessage}
            />
          </div>
        )}

        {/* Messages */}

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 bg-white"
        >
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}

          {loading && <TypingIndicator />}
        </div>

        {/* Input */}

        <div className="border-t bg-white p-3">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(input);
                }
              }}
              placeholder="Ask about your finances..."
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            <button
              onClick={() => sendMessage(input)}
              className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-black text-white flex items-center justify-center transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
