import { useRef, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../ui/Button";

export default function UploadCard({ onUpload, loading }) {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);

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

    onUpload(file);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      {/* Upload Area */}

      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="rounded-md border border-dashed border-slate-300 p-8 text-center cursor-pointer transition-colors hover:bg-slate-50"
      >
        <UploadCloud size={42} className="mx-auto text-slate-500" />

        <h2 className="mt-4 text-lg font-medium text-slate-800">
          Upload PhonePe Statement
        </h2>

        <p className="mt-2 text-sm text-slate-500">Drag & drop your PDF here</p>

        <p className="mt-1 text-sm text-slate-400">or click to browse</p>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept=".pdf"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
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
                inputRef.current.value = "";
              }}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <Button
        variant="info"
        className="mt-6 w-full"
        loading={loading}
        onClick={handleImport}
      >
        {loading ? "Importing..." : "Import Statement"}
      </Button>
    </div>
  );
}
