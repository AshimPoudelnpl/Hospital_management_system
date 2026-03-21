import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center">
    <h1 className="text-6xl font-bold text-blue-600">404</h1>
    <p className="text-gray-500 mt-2 mb-6">Page not found</p>
    <Link to="/" className="text-blue-600 hover:underline text-sm">Back to Home</Link>
  </div>
);

export default NotFound;
