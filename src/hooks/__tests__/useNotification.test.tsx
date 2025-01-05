import { renderHook, act } from "@testing-library/react";
import { useNotification } from "../useNotification";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.mock("@/components/Notification", () => ({
  __esModule: true,
  default: ({ message, title, onClose }: any) => {
    return (
      <div role="alert" data-testid="mock-notification">
        <span>{title}</span>
        <span>{message}</span>
        {onClose && <button onClick={onClose}>Close</button>}
      </div>
    );
  },
}));

describe("useNotification hook with react-hooks-testing-library", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    document.body.innerHTML = "";
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should create a notification and remove it after the timer", async () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.notify({
        timer: 1000,
        message: "Test message",
        title: "Test title",
      });
    });

    const notification = screen.getByTestId("mock-notification");
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent("Test title");
    expect(notification).toHaveTextContent("Test message");

    await waitFor(() => expect(notification).not.toBeInTheDocument(), {
      timeout: 1200,
    });
  });

  it("should handle the close callback correctly", () => {
    const mockOnClose = jest.fn();
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.notify({
        timer: 1000,
        message: "Test message",
        title: "Test title",
        onClose: mockOnClose,
      });
    });

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should add notification container to the document body if it doesn't exist", () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.notify({
        timer: 1000,
        message: "Test message",
        title: "Test title",
      });
    });

    const container = document.getElementById("notification-container");
    expect(container).toBeInTheDocument();
  });
});
