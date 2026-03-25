const FormImage = ({ 
  label = "Image", 
  onChange = null, 
  currentImage = null,
  accept = "image/*",
  className = ""
}) => {
  return (
    <div className={className}>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className="w-full text-sm"
      />
      {currentImage && (
        <p className="text-xs text-gray-400 mt-1">Current: {currentImage}</p>
      )}
    </div>
  );
};

export default FormImage;
