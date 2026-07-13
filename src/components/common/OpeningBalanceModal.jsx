import { useEffect, useState } from "react";

export default function OpeningBalanceModal({
  isOpen,
  currentBalance = 0,
  onSave,
  onCancel,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(currentBalance ? currentBalance.toString() : "");
    }
  }, [isOpen, currentBalance]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Opening Balance
          </h2>

          <p className="mt-2 text-gray-600">
            Enter the amount that was already available in your bank account
            before you started tracking transactions.
          </p>

          <input
            type="number"
            min="0"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter amount"
            className="
              mt-5
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

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
              "
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(Number(value || 0))}
              className="
                rounded-xl
                bg-blue-600
                px-5
                py-2.5
                font-medium
                text-white
                hover:bg-blue-700
              "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
