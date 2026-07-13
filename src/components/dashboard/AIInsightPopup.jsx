import { useEffect, useRef, useState } from "react";
import {
  Lightbulb,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TriangleAlert,
  HeartHandshake,
} from "lucide-react";

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
      console.log(err);
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

  useEffect(() => {
    const handleOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const accent = {
    positive: "bg-green-50 border-green-200",
    warning: "bg-amber-50 border-amber-200",
    neutral: "bg-blue-50 border-blue-200",
  };

  return (
    <div className="relative" ref={popupRef}>
      {/* Button */}

      <button
        onClick={handleOpen}
        className="rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm transition hover:bg-blue-50 hover:border-blue-300"
      >
        <Lightbulb
          size={20}
          className="text-blue-600"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-[360px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl z-50">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

            <div>

              <h2 className="font-semibold text-gray-900">
                AI Finance Insight
              </h2>

              <p className="text-sm text-gray-500">
                Personalized recommendations
              </p>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <X size={18} />
            </button>

          </div>

          {/* Loading */}

          {loading && (
            <div className="flex flex-col items-center gap-4 py-12">

              <Loader2
                className="animate-spin text-blue-600"
                size={30}
              />

              <p className="text-sm text-gray-500">
                Generating insights...
              </p>

            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="p-6">

              <p className="text-red-600 text-sm">
                {error}
              </p>

              <button
                onClick={fetchInsight}
                className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Try Again
              </button>

            </div>
          )}

          {!loading &&
            insight &&
            (() => {
              const cards = [
                {
                  title: insight.title,
                  icon: Sparkles,
                  text: insight.summary,
                },
                {
                  title: "Strength",
                  icon: HeartHandshake,
                  text: insight.strength,
                },
                {
                  title: "Warning",
                  icon: TriangleAlert,
                  text: insight.warning,
                },
                {
                  title: "Recommendation",
                  icon: Lightbulb,
                  text: insight.tip,
                },
              ];

              const current = cards[currentCard];
              const Icon = current.icon;

              return (
                <>
                  <div
                    className={`m-5 rounded-xl border p-5 ${
                      accent[insight.type] ||
                      accent.neutral
                    }`}
                  >

                    <div className="mb-4 flex items-center gap-3">

                      <div className="rounded-lg bg-white p-2 shadow-sm">
                        <Icon
                          size={20}
                          className="text-blue-600"
                        />
                      </div>

                      <h3 className="font-semibold text-gray-900">
                        {current.title}
                      </h3>

                    </div>

                    <p className="leading-7 text-sm text-gray-700">
                      {current.text}
                    </p>

                  </div>

                  {/* Footer */}

                  <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">

                    <button
                      onClick={() =>
                        setCurrentCard((p) =>
                          Math.max(0, p - 1)
                        )
                      }
                      disabled={currentCard === 0}
                      className="rounded-lg border border-gray-200 p-2 hover:bg-gray-100 disabled:opacity-40"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="flex gap-2">
                      {cards.map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full ${
                            currentCard === i
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentCard((p) =>
                          Math.min(cards.length - 1, p + 1)
                        )
                      }
                      disabled={
                        currentCard === cards.length - 1
                      }
                      className="rounded-lg border border-gray-200 p-2 hover:bg-gray-100 disabled:opacity-40"
                    >
                      <ChevronRight size={18} />
                    </button>

                  </div>
                </>
              );
            })()}
        </div>
      )}
    </div>
  );
}