import Button from "./Button";

const ConfirmModal = ({ show, onClose, onConfirm, title, message, isLoading = false, confirmText = "Confirm", cancelText = "Cancel", variant = "danger" }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/40 p-4">
      <div className="flex min-h-full items-start justify-center sm:items-center">
        <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
            <h2 className="pr-4 text-lg font-semibold text-slate-800">{title}</h2>
            <button onClick={onClose} className="text-xl leading-none text-gray-400 hover:text-gray-600">
              &times;
            </button>
          </div>
          <div className="px-4 py-4 sm:px-6">
            <p className="text-sm text-gray-600">{message}</p>
          </div>
          <div className="flex flex-col-reverse gap-2 border-t border-gray-100 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              variant={variant}
              isLoading={isLoading}
              loadingText="Processing..."
              className="w-full sm:w-auto"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
