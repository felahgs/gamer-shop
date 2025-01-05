import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLocalStorage } from "usehooks-ts";

import Page from "../cart/page";
import { mockedGames } from "@/utils/mocks";

jest.mock("usehooks-ts", () => ({
  useLocalStorage: jest.fn(),
}));

describe("CartView", () => {
  const mockSetCartStorage = jest.fn();

  beforeEach(() => {
    mockSetCartStorage.mockClear();
  });

  it("should display an empty cart message when cart is empty", async () => {
    (useLocalStorage as jest.Mock).mockReturnValue([[], mockSetCartStorage]);

    render(await Page());

    expect(
      screen.getByText(
        "Your cart is empty. Add some games to the cart to proceed!",
      ),
    ).toBeInTheDocument();

    expect(screen.queryByText("Checkout")).toBeInTheDocument();
    expect(screen.getByText("0 items")).toBeInTheDocument();
  });

  it("should render cart items and show the correct number of items", async () => {
    (useLocalStorage as jest.Mock).mockReturnValue([
      mockedGames,
      mockSetCartStorage,
    ]);

    render(await Page());

    expect(screen.queryAllByText("Game 1")).toHaveLength(2);
    expect(screen.queryAllByText("Game 2")).toHaveLength(2);
    expect(screen.queryAllByText("Game 3")).toHaveLength(2);
    expect(screen.queryAllByText("3 items")).toHaveLength(2);

    const checkoutButton = screen.getByRole("button", { name: "Checkout" });
    expect(checkoutButton).not.toBeDisabled();
  });

  it("should remove a game from the cart when the remove button is clicked", async () => {
    (useLocalStorage as jest.Mock).mockReturnValue([
      [mockedGames[0]],
      mockSetCartStorage,
    ]);

    render(await Page());

    expect(screen.getAllByText("Game 1")).toHaveLength(2);

    const removeButton = screen.getByRole("button", { name: "remove item" });

    await userEvent.click(removeButton);

    expect(mockSetCartStorage).toHaveBeenCalledWith([]);
  });

  it("should disable the checkout button when the cart is empty", async () => {
    (useLocalStorage as jest.Mock).mockReturnValue([[], mockSetCartStorage]);

    render(await Page());

    const checkoutButton = screen.getByRole("button", { name: "Checkout" });
    expect(checkoutButton).toBeDisabled();
  });
});
