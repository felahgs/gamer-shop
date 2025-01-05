import React, { useState } from "react";
import Notification from "./Notification"; // Import your Notification component

interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

const NotificationContainer = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const addNotification = (notification: NotificationData) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <div className="fixed top-5 right-5 space-y-2 z-50">
      {notifications.map(({ id, title, message, type }) => (
        <Notification
          key={id}
          title={title}
          message={message}
          type={type}
          onClose={() => removeNotification(id)}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
