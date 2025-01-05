/* eslint-disable @next/next/no-img-element */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CartItem from "./CartItem";
import userEvent from "@testing-library/user-event";

describe("CartItem", () => {
  const mockedProps = {
    genre: "Action",
    title: "Product Title",
    price: 50,
    img: <img src="#" alt="image" />,
    description: "Phasellus ut pellentesque felis. Nam non diam venenatis.",
  };

  it("should render properly with all product information", () => {
    render(<CartItem {...mockedProps} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Product Title")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Phasellus ut pellentesque felis. Nam non diam venenatis.",
      ),
    ).toBeInTheDocument();
  });

  it("should call the onAddItem method when clicking the button", async () => {
    const mockedOnRemove = jest.fn();

    render(<CartItem {...mockedProps} onRemove={mockedOnRemove} />);

    const button = screen.getByRole("button", {
      name: "remove item",
    });

    await userEvent.click(button);

    expect(mockedOnRemove).toHaveBeenCalledTimes(1);
  });
});
