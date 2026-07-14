import Button from "../ui/Button";

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
            <Button variant="secondary" onClick={onCancel}>
              {cancelText}
            </Button>

            <Button variant="danger" onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}