import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import { askAI } from "../../api/chatApi";
import robotGif from "../../assets/chatbot.png";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const sendMessage = async (message, history) => {
    setLoading(true);

    try {
      const response = await askAI(message, history);
      return response.answer;
    } catch {
      return "Sorry, I couldn't process your request.";
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`fixed right-6 z-50 w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-125 active:scale-95 ${
          footerVisible ? "bottom-16" : "bottom-6"
        }`}
      >
        <img
          src={robotGif}
          alt="Finance Assistant"
          className="w-16 h-16 object-contain"
        />
      </button>

      <ChatWindow
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onSend={sendMessage}
      />
    </>
  );
}