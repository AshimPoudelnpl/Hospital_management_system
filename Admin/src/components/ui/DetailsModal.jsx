
const Modal = ({ show, onClose, title, children, size = "md" }) => {
  if (!show) return null;

  const sizeClass = size === "lg" ? "sm:max-w-lg" : "sm:max-w-md";

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/40 p-4">
      <div className="flex min-h-full items-start justify-center sm:items-center">
        <div className={`flex max-h-[calc(100vh-2rem)] w-full ${sizeClass} flex-col overflow-hidden rounded-xl bg-white shadow-xl`}>
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
            <h2 className="pr-4 text-lg font-semibold text-slate-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-xl leading-none text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
          <div className="overflow-y-auto px-4 py-4 sm:px-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
