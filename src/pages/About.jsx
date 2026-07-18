import {
  Wallet,
  Upload,
  Receipt,
  Repeat,
  BarChart3,
  Lightbulb,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900">
            About SmartSaver
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-base text-gray-500 leading-8">
            SmartSaver is your intelligent personal finance companion that helps
            you manage expenses, import UPI statements, automate recurring
            transactions, visualize spending, and receive AI-powered financial
            insights—all in one place.
          </p>
        </section>

        {/* Intro */}
        <section className="bg-white border border-gray-200 rounded-md shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Smarter Expense Tracking Starts Here
          </h2>

          <p className="text-gray-600 leading-8">
            Whether you spend using cash, UPI, or bank transfers, SmartSaver
            keeps all your finances organized. Import your PhonePe statement,
            track cash transactions, automate recurring expenses, and understand
            your spending with beautiful charts and AI-powered insights.
          </p>
        </section>

        {/* How To Use */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            How to Use SmartSaver
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="text-blue-600 flex-shrink-0" size={22} />

                <h3 className="font-semibold text-lg text-gray-900">
                  Set Opening Balance
                </h3>
              </div>

              <p className="mt-2 text-sm text-gray-600 leading-6">
                Begin by setting your opening balance. You can include your
                total balance (cash + cashless) or only your cashless balance.
                Cash can always be added later through manual transactions.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Upload className="text-blue-600 flex-shrink-0" size={22} />
                <h3 className="font-semibold text-lg text-gray-900">
                  Import PhonePe Statement
                </h3>
              </div>

              <p className="mt-2 text-sm text-gray-600 leading-6">
                Upload your PhonePe transaction statement and SmartSaver will
                automatically import your UPI transactions while removing any
                duplicate records.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Receipt className="text-blue-600 flex-shrink-0" size={22} />
                <h3 className="font-semibold text-lg text-gray-900">
                  Add Cash Transactions
                </h3>
              </div>

              <p className="mt-2 text-sm text-gray-600 leading-6">
                Easily record cash income and expenses manually so all your
                finances stay in one place.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Repeat className="text-blue-600 flex-shrink-0" size={22} />
                <h3 className="font-semibold text-lg text-gray-900">
                  Recurring Transactions
                </h3>
              </div>

              <p className="mt-2 text-sm text-gray-600 leading-6">
                Schedule recurring income or expenses as Daily, Weekly, or
                Monthly. SmartSaver automatically creates those transactions for
                you.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="text-blue-600 flex-shrink-0" size={22} />
                <h3 className="font-semibold text-lg text-gray-900">
                  View Analytics
                </h3>
              </div>

              <p className="mt-2 text-sm text-gray-600 leading-6">
                Analyze your spending with Monthly Spending Charts,
                Category-wise Expense Charts, and Weekday Spending Analysis to
                better understand your financial habits.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="text-blue-600 flex-shrink-0" size={22} />
                <h3 className="font-semibold text-lg text-gray-900">
                  AI Financial Insights
                </h3>
              </div>

              <p className="mt-2 text-sm text-gray-600 leading-6">
                Click the 💡 bulb icon anytime to receive AI-generated insights
                about your budget, spending behavior, and personalized saving
                suggestions.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white border border-gray-200 rounded-md shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Features You'll Love
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Opening Balance Management",
              "PhonePe Statement Import",
              "Duplicate Transaction Detection",
              "Cash & Cashless Tracking",
              "Recurring Daily, Weekly & Monthly Transactions",
              "Monthly Spending Charts",
              "Category-wise Expense Analysis",
              "Weekday Spending Analysis",
              "AI Budget & Spending Insights",
              "Secure Transaction Management",
            ].map((feature) => (
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

        {/* Rules */}
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
        <section className="bg-gradient-to-r from-gray-300 to-gray-300 rounded-md text-white p-8 mb-12">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-gray-900">💡 AI-Powered Financial Assistant</h2>

            <p className="mt-5 text-gray-500 text-base leading-8">
              SmartSaver doesn't just store your transactions—it understands
              them. Click the bulb icon on your dashboard to receive intelligent
              insights about where your money goes, your biggest spending
              categories, budget analysis, and personalized suggestions to help
              you save more every month.
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

          <div className="mt-8">
            <Button variant="info" onClick={() => navigate("/")}>
              Start Using SmartSaver
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
