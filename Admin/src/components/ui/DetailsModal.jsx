

const Modal = ({ show, onClose, title, children, size = "md" }) => {
  if (!show) return null;

  const sizeClass = size === "lg" ? "max-w-lg" : "max-w-md";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
      <div className={`bg-white rounded-xl shadow-xl w-full ${sizeClass} mx-4`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
