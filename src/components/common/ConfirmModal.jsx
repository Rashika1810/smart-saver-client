export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        <p className="mt-3 text-gray-400">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold hover:bg-red-700 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
