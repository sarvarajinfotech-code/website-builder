import { Home } from "lucide-react";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <h1 className="text-9xl font-extrabold tracking-widest animate-pulse">
        404
      </h1>
      <div className="bg-primary px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <div className="mt-8 text-center">
        <p className="text-2xl font-semibold md:text-3xl mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/admin/dashboard"
          className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          <Home className="w-5 h-5" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
