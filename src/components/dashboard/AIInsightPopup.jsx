import { useEffect, useRef, useState } from "react";
import { Lightbulb, X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

import api from "../../api/axios";

export default function AIInsightPopup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState(null);
  const [error, setError] = useState("");
  const [currentCard, setCurrentCard] = useState(0);

  const popupRef = useRef(null);

  const fetchInsight = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/ai/dashboard-insight");

      setInsight(data.data);
      setCurrentCard(0);
    } catch (err) {
      console.error(err);
      setError("Unable to generate your financial insight.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);

    if (!insight && !loading) {
      fetchInsight();
    }
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const accentColor = {
    positive: "border-green-500",
    neutral: "border-blue-500",
    warning: "border-yellow-500",
  };

  return (
    <div className="relative" ref={popupRef}>
      {/* Lightbulb Button */}

      <button
        onClick={handleOpen}
        className={`
          rounded-full
          p-2
          transition
          duration-200
          hover:bg-zinc-800
          ${
            open
              ? "bg-yellow-500/10 text-yellow-400 shadow-lg shadow-yellow-500/20"
              : "text-zinc-300"
          }
        `}
      >
        <Lightbulb size={24} />
      </button>

      {/* Popup */}

      {open && (
        <div
          className={`
          absolute
          right-0
          mt-3
          w-[320px]
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          shadow-2xl
          z-50
          overflow-hidden
          animate-in
          fade-in
          zoom-in-95
        `}
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <h2 className="text-base font-semibold">Today's Finance Brief</h2>

            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 hover:bg-zinc-800"
            >
              <X size={16} />
            </button>
          </div>

          {/* Loading */}

          {loading && (
            <div className="flex flex-col items-center justify-center gap-4 py-10">
              <Loader2 size={30} className="animate-spin text-blue-400" />

              <p className="text-xs text-gray-400">
                Generating your personalized insight...
              </p>
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="space-y-4 p-6">
              <p className="text-xs text-red-400">{error}</p>

              <button
                onClick={fetchInsight}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs hover:bg-blue-500"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Insight */}

          {!loading && insight && (
            <>
              {(() => {
                const cards = [
                  {
                    title: insight.title,
                    content: insight.summary,
                  },
                  {
                    title: "Happiness",
                    content: insight.strength,
                  },
                  {
                    title: "Warning",
                    content: insight.warning,
                  },
                  {
                    title: "Tip",
                    content: insight.tip,
                  },
                ];

                const current = cards[currentCard];

                return (
                  <>
                    <div
                      className={`rounded-b-xl ${
                        accentColor[insight.type] || "border-blue-500"
                      } min-h-[170px] px-2 py-3 flex flex-col justify-between`}
                    >
                      <div className="flex items-center min-h-[170px] px-3 py-5">
                        {/* Left Arrow */}
                        <button
                          onClick={() =>
                            setCurrentCard((prev) => Math.max(prev - 1, 0))
                          }
                          disabled={currentCard === 0}
                          className="rounded-full p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:opacity-25"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        {/* Content */}
                        <div className="flex-1 px-3 text-center">
                          <h3 className="text-base font-semibold text-white">
                            {current.title}
                          </h3>

                          <p className="mt-3 text-xs leading-6 text-gray-300">
                            {current.content}
                          </p>
                        </div>

                        {/* Right Arrow */}
                        <button
                          onClick={() =>
                            setCurrentCard((prev) =>
                              Math.min(prev + 1, cards.length - 1),
                            )
                          }
                          disabled={currentCard === cards.length - 1}
                          className="rounded-full p-1 text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:opacity-25"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </>
          )}
        </div>
      )}
    </div>
  );
}
