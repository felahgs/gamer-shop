import React from "react";
import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export interface NotificationProps {
  message: string;
  title: string;
  type?: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

function Notification({
  title,
  message,
  type = "info",
  onClose,
}: NotificationProps) {
  const icon = {
    info: <InformationCircleIcon className="w-6 h-6 text-info" />,
    success: <CheckCircleIcon className="w-6 h-6 text-success" />,
    warning: <ExclamationTriangleIcon className="w-6 h-6 text-warning" />,
    error: <ExclamationCircleIcon className="w-6 h-6 text-error" />,
  };

  const textColor = {
    info: "text-blue-700",
    success: "text-green-700",
    warning: "text-yellow-700",
    error: "text-red-700",
  };

  return (
    <div
      className={`fixed top-5 right-5 max-w-xs w-full bg-${type}-500 bg-white text-black p-4 rounded-lg shadow-lg flex items-center space-x-3`}
    >
      {icon[type]}
      <div className="flex-1">
        <div className={`font-semibold ${textColor[type]}`}>{title}</div>
        <div className={`text-sm text-primary text-opacity-90`}>{message}</div>
      </div>
      <button
        onClick={onClose}
        className={`ml-3 text-primary hover:text-gray-300`}
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Notification;
