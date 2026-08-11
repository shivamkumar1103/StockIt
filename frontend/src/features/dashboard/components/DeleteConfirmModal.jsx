import { X, AlertTriangle, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

const DeleteConfirmModal = ({ stock, onConfirm, onCancel, isDeleting }) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_150ms_ease-out]"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-[scaleIn_200ms_ease-out]">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* Warning icon */}
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <AlertTriangle size={28} className="text-[#EF4444]" />
          </div>

          <h3 className="text-lg font-bold text-[#333333] mb-1">
            Remove from Watchlist
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-65">
            Are you sure you want to remove{" "}
            <span className="font-semibold text-[#333333]">
              {stock?.symbol}
            </span>{" "}
            from your watchlist?
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(stock.symbol)}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#EF4444] text-white text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove"
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body,
  );
};

export default DeleteConfirmModal;
