import ReactDOM from "react-dom/client";
import Notification, { NotificationProps } from "@/components/Notification";

export function useNotification(defaultProps?: NotificationProps) {
  const notify = ({ timer = 5000, onClose, ...rest }: NotificationProps) => {
    let container = document.getElementById("notification-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "notification-container";
      document.body.appendChild(container);
    }

    const notificationDiv = document.createElement("div");
    container.appendChild(notificationDiv);

    const timeoutId = setTimeout(() => {
      root.unmount();
      container.removeChild(notificationDiv);
    }, timer);

    const handleClose = () => {
      clearTimeout(timeoutId);

      setTimeout(() => {
        root.unmount();
        container.removeChild(notificationDiv);
      }, 500);

      onClose ? onClose() : defaultProps?.onClose ? defaultProps.onClose : null;
    };

    const root = ReactDOM.createRoot(notificationDiv);
    root.render(
      <Notification
        {...defaultProps}
        {...rest}
        timer={timer - 1000}
        onClose={handleClose}
      />,
    );
  };

  return { notify };
}
