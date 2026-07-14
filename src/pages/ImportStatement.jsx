import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UploadCard from "../components/import/UploadCard";
import Button from "../components/ui/Button";
import { uploadPhonePeStatement } from "../api/importApi";

export default function ImportStatement() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleUpload = async (file) => {
    try {
      setLoading(true);

      const data = await uploadPhonePeStatement(file);

      setSummary(data.summary);

      toast.success(data.message);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to import statement."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Import PhonePe Statement
        </h1>

        <p className="mt-2 text-gray-500">
          Upload your PhonePe PDF statement. Duplicate
          transactions will automatically be skipped.
        </p>
      </div>

      <UploadCard
        onUpload={handleUpload}
        loading={loading}
      />

      {summary && (
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            Import Summary
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="rounded-xl bg-slate-100 p-4">
              <p className="text-sm text-gray-500">
                Total Found
              </p>

              <p className="text-2xl font-bold">
                {summary.totalFound}
              </p>
            </div>

            <div className="rounded-xl bg-green-100 p-4">
              <p className="text-sm text-gray-500">
                Imported
              </p>

              <p className="text-2xl font-bold text-green-700">
                {summary.imported}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-100 p-4">
              <p className="text-sm text-gray-500">
                Duplicates
              </p>

              <p className="text-2xl font-bold text-yellow-700">
                {summary.duplicates}
              </p>
            </div>

            <div className="rounded-xl bg-red-100 p-4">
              <p className="text-sm text-gray-500">
                Invalid
              </p>

              <p className="text-2xl font-bold text-red-700">
                {summary.invalid}
              </p>
            </div>

            <div className="rounded-xl bg-blue-100 p-4">
              <p className="text-sm text-gray-500">
                Valid
              </p>

              <p className="text-2xl font-bold text-blue-700">
                {summary.valid}
              </p>
            </div>
          </div>

          <Button
            variant="info"
            className="mt-8"
            onClick={() => navigate("/transactions")}
          >
            View Transactions
          </Button>
        </div>
      )}
    </div>
  );
}