import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UploadCard from "../components/import/UploadCard";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { uploadPhonePeStatement } from "../api/importApi";

export default function ImportStatement() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleUpload = async (file) => {
    if (loading) return;

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
    <>
      {loading && <Loader />}

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="header-title">
            Import PhonePe Statement
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Upload your PhonePe PDF statement. Duplicate transactions are
            automatically skipped during import.
          </p>
        </div>

        <UploadCard
          onUpload={handleUpload}
          loading={loading}
        />

        {summary && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
            <h1 className="header-title">
              Import Summary
            </h1>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Total Found
                </p>

                <p className="mt-1 text-xl font-semibold text-slate-800">
                  {summary.totalFound}
                </p>
              </div>

              <div className="rounded-md border border-green-100 bg-green-50 p-4">
                <p className="text-sm text-slate-500">
                  Imported
                </p>

                <p className="mt-1 text-xl font-semibold text-green-700">
                  {summary.imported}
                </p>
              </div>

              <div className="rounded-md border border-yellow-100 bg-yellow-50 p-4">
                <p className="text-sm text-slate-500">
                  Duplicates
                </p>

                <p className="mt-1 text-xl font-semibold text-yellow-700">
                  {summary.duplicates}
                </p>
              </div>

              <div className="rounded-md border border-red-100 bg-red-50 p-4">
                <p className="text-sm text-slate-500">
                  Invalid
                </p>

                <p className="mt-1 text-xl font-semibold text-red-700">
                  {summary.invalid}
                </p>
              </div>

              <div className="rounded-md border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm text-slate-500">
                  Valid
                </p>

                <p className="mt-1 text-xl font-semibold text-blue-700">
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
    </>
  );
}