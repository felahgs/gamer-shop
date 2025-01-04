import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("should render properly", () => {
    render(<Button>Button </Button>);

    const button = screen.getByRole("button", { name: "Button" });

    expect(button).toBeInTheDocument();
  });

  it("should call onClick when clicking the button", async () => {
    const mockedOnClick = jest.fn();
    render(<Button onClick={mockedOnClick}>Button </Button>);

    const button = screen.getByRole("button", { name: "Button" });
    await userEvent.click(button);

    expect(mockedOnClick).toHaveBeenCalled();
  });

  it("should not call onClick when the button is disabled", async () => {
    const mockedOnClick = jest.fn();
    render(
      <Button disabled onClick={mockedOnClick}>
        Button
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Button" });
    await userEvent.click(button);

    expect(mockedOnClick).not.toHaveBeenCalled();
  });

  it("should have w-full class when fluid is true", () => {
    render(<Button fluid>Button</Button>);

    const button = screen.getByRole("button", { name: "Button" });

    expect(button).toHaveClass("w-full");
  });

  it("should render the button in a loading state and disabled", async () => {
    const mockedOnClick = jest.fn();
    render(
      <Button loading onClick={mockedOnClick}>
        Button
      </Button>,
    );

    const button = screen.getByRole("button");
    const loader = screen.getByRole("status");
    await userEvent.click(button);

    expect(mockedOnClick).not.toHaveBeenCalled();
    expect(loader).toBeInTheDocument();
  });
});
