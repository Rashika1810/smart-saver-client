import { useRef, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../ui/Button";
export default function UploadCard({
  onUpload,
  loading,
}) {
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
    <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-8">

      {/* Upload Area */}

      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-indigo-300 rounded-2xl p-10 text-center cursor-pointer transition hover:bg-indigo-50"
      >
        <UploadCloud
          size={55}
          className="mx-auto text-indigo-600"
        />

        <h2 className="mt-4 text-xl font-bold">
          Upload PhonePe Statement
        </h2>

        <p className="mt-2 text-gray-500">
          Drag & Drop your PDF here
        </p>

        <p className="text-gray-400 text-sm mt-1">
          or click to browse
        </p>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept=".pdf"
          onChange={(e) =>
            handleFile(e.target.files[0])
          }
        />
      </div>

      {/* Selected File */}

      {file && (
        <div className="mt-8 rounded-xl border p-4 bg-slate-50">

          <div className="flex items-center gap-3">

            <FileText
              className="text-red-500"
              size={32}
            />

            <div className="flex-1">

              <h3 className="font-semibold">
                {file.name}
              </h3>

              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Button */}

    <Button
  variant="info"
  className="mt-8 w-full"
  loading={loading}
  onClick={handleImport}
>
  {loading ? "Importing..." : "Import Statement"}
</Button>
    </div>
  );
}