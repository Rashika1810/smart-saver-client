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
import Button from "../ui/Button";
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
    positive: "border-l-4 border-l-green-500",
    warning: "border-l-4 border-l-amber-500",
    neutral: "border-l-4 border-l-blue-500",
  };

  return (
    <div
      className="relative"
      ref={popupRef}
    >
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
      >
        <Lightbulb size={20} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-[360px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                AI Finance Insight
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Personalized recommendations
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center gap-4 py-12">
              <Loader2
                className="animate-spin text-blue-600"
                size={28}
              />

              <p className="text-sm text-gray-500">
                Generating insights...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="p-5">
              <p className="text-sm text-red-600">
                {error}
              </p>

              <Button
                variant="info"
                className="mt-4"
                onClick={fetchInsight}
              >
                Try Again
              </Button>
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
                  {/* Insight Card */}
                  <div
                    className={`m-5 rounded-md border border-gray-200 bg-white p-5 ${
                      accent[insight.type] || accent.neutral
                    }`}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                        <Icon
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <h3 className="text-base font-semibold text-gray-900">
                        {current.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-6 text-gray-600">
                      {current.text}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
                    <button
                      onClick={() =>
                        setCurrentCard((p) => Math.max(0, p - 1))
                      }
                      disabled={currentCard === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="flex gap-2">
                      {cards.map((_, i) => (
                        <span
                          key={i}
                          className={`h-2 w-2 rounded-full ${
                            currentCard === i
                              ? "bg-slate-700"
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
                      disabled={currentCard === cards.length - 1}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
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