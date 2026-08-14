import { useState } from "react";
import {
  Lightbulb,
  ShieldCheck,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { ABOUT_FEATURE_LIST, ABOUT_FEATURES } from "../constants/aboutConstants";

export default function About() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Number of cards shown per slide
  const cardsPerSlide = 3;

  // Create groups of cards
  const slides = [];

  for (let i = 0; i < ABOUT_FEATURES.length; i += cardsPerSlide) {
    slides.push(ABOUT_FEATURES.slice(i, i + cardsPerSlide));
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">
            About SmartSaver
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-base text-gray-500 leading-8">
            SmartSaver is your intelligent personal finance companion that helps
            you manage expenses, import UPI statements, automate recurring
            transactions, visualize spending, and get personalized AI-powered
            financial insights—all in one place.
          </p>

          <div className="mt-8">
            <Button variant="info" onClick={() => navigate("/")}>
              Start Using SmartSaver
            </Button>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-white border border-gray-200 rounded-md shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Smarter Expense Tracking Starts Here
          </h2>

          <p className="text-gray-600 leading-8">
            Whether you spend using cash, UPI, or bank transfers, SmartSaver
            keeps your finances organized. Import your PhonePe statement, track
            cash transactions, create flexible recurring transactions, and
            understand your spending with detailed charts, AI-powered insights,
            and an intelligent financial chatbot.
          </p>
        </section>

        {/* How To Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            How to Use SmartSaver
          </h2>

          <p className="text-center text-sm text-gray-500 mt-2 mb-8">
            Explore the features that make managing your finances easier.
          </p>

          {/* Slider */}
          <div className="relative">
            {/* Previous */}
            <button
              onClick={previousSlide}
              aria-label="Previous slide"
              className="
                absolute
                left-0
                top-1/2
                -translate-y-1/2
                -translate-x-3
                md:-translate-x-5
                z-10
                w-10
                h-10
                rounded-full
                bg-white
                border
                border-gray-200
                shadow-sm
                flex
                items-center
                justify-center
                text-gray-600
                hover:text-blue-600
                hover:border-blue-200
                transition
              "
            >
              <ChevronLeft size={20} />
            </button>

            {/* Cards */}
            <div className="overflow-hidden px-4 md:px-6">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {slides.map((slide, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid items-stretch md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {slide.map((feature) => {
                        const Icon = feature.icon;

                        return (
                          <div
                            key={feature.title}
                             className="
    h-full
    min-h-[220px]
    bg-white
    border
    border-gray-200
    rounded-md
    shadow-sm
    p-6
    flex
    flex-col
    hover:border-blue-200
    transition
  "
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <Icon
                                className="text-blue-600 flex-shrink-0"
                                size={22}
                              />

                              <h3 className="font-semibold text-lg text-gray-900">
                                {feature.title}
                              </h3>
                            </div>

                            <p className="text-sm text-gray-600 leading-6">
                              {feature.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next */}
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                translate-x-3
                md:translate-x-5
                z-10
                w-10
                h-10
                rounded-full
                bg-white
                border
                border-gray-200
                shadow-sm
                flex
                items-center
                justify-center
                text-gray-600
                hover:text-blue-600
                hover:border-blue-200
                transition
              "
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-7">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    currentSlide === index
                      ? "w-6 bg-blue-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }
                `}
              />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-white border border-gray-200 rounded-md shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Features You'll Love
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            {ABOUT_FEATURE_LIST.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 text-gray-700"
              >
                <CheckCircle
                  size={20}
                  className="text-blue-600 mt-1 flex-shrink-0"
                />

                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Transaction Rules */}
        <section className="bg-blue-50 border border-blue-100 rounded-md p-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-blue-600" />

            <h2 className="text-2xl font-semibold text-gray-900">
              Transaction Rules
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 leading-6">
            <p>
              • Imported{" "}
              <strong>UPI transactions cannot be edited or deleted</strong>.
              This ensures your imported statement remains accurate and
              trustworthy.
            </p>

            <p>
              • Transactions that you add manually can be edited or deleted
              whenever needed.
            </p>

            <p>
              • Duplicate UPI transactions are automatically detected during
              statement import.
            </p>
          </div>
        </section>

        {/* AI Section */}
        <section className="bg-gray-200 rounded-md p-8 mb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <Lightbulb size={24} className="text-blue-600" />

              <h2 className="text-2xl font-semibold text-gray-900">
                AI-Powered Financial Intelligence
              </h2>
            </div>

            <p className="mt-5 text-gray-600 text-base leading-8">
              SmartSaver provides two ways to get intelligent financial
              assistance. Use the bulb on your dashboard to receive personalized
              insights about your spending, budget, and saving opportunities.
              You can also chat with the AI Financial Assistant to ask questions
              about your balance, spending categories, merchants, transactions,
              and savings.
            </p>
          </div>
        </section>

        {/* Footer */}
        <section className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            Track Smarter. Spend Wiser. Save More.
          </h2>

          <p className="mt-4 text-gray-500 text-base">
            Everything you need to manage your personal finances in one simple
            and intelligent platform.
          </p>
        </section>
      </div>
    </div>
  );
}
