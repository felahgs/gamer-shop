import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Notification from "./Notification";

jest.mock("@heroicons/react/24/outline", () => ({
  CheckCircleIcon: () => <span>CheckCircleIcon</span>,
  ExclamationCircleIcon: () => <span>ExclamationCircleIcon</span>,
  ExclamationTriangleIcon: () => <span>ExclamationTriangleIcon</span>,
  InformationCircleIcon: () => <span>InformationCircleIcon</span>,
  XMarkIcon: () => <span>XMarkIcon</span>,
}));

describe("Notification component", () => {
  it("renders notification with title and message", () => {
    render(
      <Notification
        title="Success!"
        message="Your operation was successful."
        type="success"
      />,
    );

    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(
      screen.getByText("Your operation was successful."),
    ).toBeInTheDocument();
  });

  it("renders correct icon for each type", () => {
    render(
      <Notification
        title="Info"
        message="This is an informational message."
        type="info"
      />,
    );
    expect(screen.getByText("InformationCircleIcon")).toBeInTheDocument();
  });

  it("renders success icon when type is success", () => {
    render(
      <Notification
        title="Success"
        message="Operation completed."
        type="success"
      />,
    );
    expect(screen.getByText("CheckCircleIcon")).toBeInTheDocument();
  });

  it("renders error icon when type is error", () => {
    render(
      <Notification
        title="Error"
        message="Something went wrong."
        type="error"
      />,
    );
    expect(screen.getByText("ExclamationCircleIcon")).toBeInTheDocument();
  });

  it("renders warning icon when type is warning", () => {
    render(
      <Notification title="Warning" message="Be careful!" type="warning" />,
    );
    expect(screen.getByText("ExclamationTriangleIcon")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <Notification
        title="Closable Notification"
        message="This notification can be closed."
        onClose={onClose}
      />,
    );

    const closeButton = screen.getByText("XMarkIcon");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not show close button if onClose is not provided", () => {
    render(
      <Notification
        title="No Close Button"
        message="This notification cannot be closed."
      />,
    );

    const closeButton = screen.queryByText("XMarkIcon");
    expect(closeButton).not.toBeInTheDocument();
  });

  it("call onClose after the time expires", async () => {
    const mockedOnClose = jest.fn();

    jest.useFakeTimers();
    render(
      <Notification
        title="Timed out"
        message="This will disappear after 2 seconds."
        timer={2000}
        onClose={mockedOnClose}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(mockedOnClose).toHaveBeenCalled();
    });
  });
});
