import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client"; // For React 18 and newer
import Notification, { NotificationProps } from "@/components/Notification";

export function useNotification() {
  const notify = ({ type, message, title }: NotificationProps) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);
    root.render(<Notification {...{ type, message, title }} />);

    setTimeout(() => {
      root.unmount();
      document.body.removeChild(container);
    }, 5000);
  };

  return { notify };
}
