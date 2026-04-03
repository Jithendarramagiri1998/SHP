import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen animated-gradient-bg text-white">

      <Navbar />

      <div className="flex items-center justify-center px-4 py-20">

        <div className="glass-panel p-10 rounded-2xl text-center max-w-md w-full">

          {/* ICON */}
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-2 gradient-text">
            404 - Page Not Found
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-400 mb-6">
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          {/* ACTION BUTTON */}
          <Link href="/">
            <Button className="w-full bg-red-600 hover:bg-red-700 gap-2">
              <Home size={16} /> Go Back Home
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
}
