import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UploadCard from "../components/import/UploadCard";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";

import { uploadPhonePeStatement } from "../api/importApi";

import {
  IMPORT_SUMMARY_FIELDS,
  IMPORT_STATEMENT_TEXT,
} from "../constants/importConstants";

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

      toast.success(
        data.message || IMPORT_STATEMENT_TEXT.successMessage
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          IMPORT_STATEMENT_TEXT.errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="header-title">
            {IMPORT_STATEMENT_TEXT.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {IMPORT_STATEMENT_TEXT.description}
          </p>
        </div>

        {/* Upload */}
        <UploadCard
          onUpload={handleUpload}
          loading={loading}
        />

        {/* Import Summary */}
        {summary && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">

            <h1 className="header-title">
              {IMPORT_STATEMENT_TEXT.summaryTitle}
            </h1>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {IMPORT_SUMMARY_FIELDS.map((field) => (
                <div
                  key={field.key}
                  className={`
                    rounded-md
                    border
                    p-4
                    ${field.containerClass}
                  `}
                >
                  <p className="text-sm text-slate-500">
                    {field.label}
                  </p>

                  <p
                    className={`
                      mt-1
                      text-xl
                      font-semibold
                      ${field.valueClass}
                    `}
                  >
                    {summary[field.key]}
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="info"
              className="mt-8"
              onClick={() => navigate("/transactions")}
            >
              {IMPORT_STATEMENT_TEXT.viewTransactionsLabel}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}