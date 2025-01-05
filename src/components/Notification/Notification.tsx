import React, { useState, useEffect } from "react";
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
  timer?: number;
  onClose?: () => void;
}

function Notification({
  title,
  message,
  type = "info",
  timer = 4000,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const visibleTime = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, timer);

    return () => clearTimeout(visibleTime);
  }, [onClose, timer]);

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

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`max-w-xs w-full bg-${type}-500 bg-white text-black p-4 rounded-lg shadow-lg flex items-center space-x-3 transform ${
        isVisible ? "translate-x-0 pr-10" : "translate-x-full right-0"
      } transition-transform duration-500 ease-in-out`}
    >
      {icon[type]}
      <div className="flex-1">
        <div className={`font-semibold ${textColor[type]}`}>{title}</div>
        <div className={`text-sm text-primary text-opacity-90`}>{message}</div>
      </div>
      {onClose && (
        <button
          onClick={handleClose}
          className={`ml-3 text-primary hover:text-gray-300`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default Notification;
