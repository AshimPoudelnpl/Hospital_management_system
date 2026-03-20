export const globalErrorHandler = (err, req, res, next) => {
  const message = err.message || "Internal server error";
  const status = err.status || "Failed";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ status, message });
};
