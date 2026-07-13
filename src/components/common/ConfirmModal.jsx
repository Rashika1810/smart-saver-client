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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-xl">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

          <p className="mt-3 text-gray-600 leading-relaxed">{message}</p>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="
                rounded-xl
                border
                border-gray-300
                bg-white
                px-5
                py-2.5
                font-medium
                text-gray-700
                hover:bg-gray-100
                transition
              "
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className="
                rounded-xl
                bg-red-600
                px-5
                py-2.5
                font-medium
                text-white
                hover:bg-red-700
                transition
              "
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
