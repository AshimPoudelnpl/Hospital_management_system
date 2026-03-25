import Button from "./Button";

const ConfirmModal = ({ show, onClose, onConfirm, title, message, isLoading = false, confirmText = "Confirm", cancelText = "Cancel", variant = "danger" }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100">
          <Button type="button" onClick={onClose} variant="secondary" disabled={isLoading}>
            {cancelText}
          </Button>
          <Button type="button" onClick={onConfirm} variant={variant} isLoading={isLoading} loadingText="Processing...">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
