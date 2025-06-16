import type React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface ErrorFallbackProps {
  title: string;
  message: string;
  actionText?: string;
  actionLink?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title,
  message,
  actionText = "Go Home",
  actionLink = "/",
}) => {
  return (
    <div className="w-full max-w-[1100px] mx-auto py-12 px-4 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-red-100 p-4 rounded-full mb-6">
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6 text-gray-600 max-w-md">{message}</p>
        <Link
          href={actionLink}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          {actionText}
        </Link>
      </div>
    </div>
  );
};

export default ErrorFallback;
