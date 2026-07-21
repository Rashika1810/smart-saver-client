import { useRef, useState } from "react";
import { UploadCloud, FileText, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../ui/Button";

export default function UploadCard({ onUpload, loading }) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [consent, setConsent] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Only PDF statements are allowed.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      toast.error("Maximum file size is 20 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (loading) return;

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleImport = () => {
    if (!file) {
      toast.warning("Please choose a PDF first.");
      return;
    }

    if (!consent) {
      toast.warning("Please confirm the privacy notice before importing.");
      return;
    }

    onUpload(file);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      {/* Upload Area */}
      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="cursor-pointer rounded-md border border-dashed border-slate-300 p-8 text-center transition-colors hover:bg-slate-50"
      >
        <UploadCloud size={42} className="mx-auto text-slate-500" />

        <h2 className="mt-4 text-lg font-medium text-slate-800">
          Upload PhonePe Statement
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Drag & drop your PDF here
        </p>

        <p className="mt-1 text-sm text-slate-400">
          or click to browse
        </p>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept=".pdf"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {/* Selected File */}
      {file && (
        <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="text-slate-500" size={24} />

              <div>
                <h3 className="text-sm font-medium text-slate-800">
                  {file.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setConsent(false);
                inputRef.current.value = "";
              }}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={20}
            className="mt-0.5 flex-shrink-0 text-emerald-600"
          />

          <div>
            <h3 className="text-sm font-semibold text-emerald-800">
              Your Privacy Matters
            </h3>

            <p className="mt-1 text-sm leading-6 text-emerald-700">
              Your uploaded PhonePe statement is processed securely to extract
              transaction details for your expense tracker. The original PDF is
              <strong> not stored </strong>
              after processing. Only the transaction information required for
              budgeting, analytics, and expense tracking is saved to your
              account.
            </p>
          </div>
        </div>
      </div>

      {/* Consent */}
      <label className="mt-5 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />

        <span className="text-sm leading-6 text-slate-600">
          I understand that my PhonePe statement will be processed to import my
          transactions, and that the original PDF will not be stored after
          processing.
        </span>
      </label>

      {/* Import Button */}
      <Button
        variant="info"
        className="mt-6 w-full"
        loading={loading}
        disabled={!consent || !file || loading}
        onClick={handleImport}
      >
        {loading ? "Importing..." : "Import Statement"}
      </Button>
    </div>
  );
}