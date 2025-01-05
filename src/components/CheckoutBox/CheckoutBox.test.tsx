import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CheckoutBox from "./CheckoutBox";

const mockProducts = [
  {
    id: "1",
    name: "Product 1",
    price: 29.99,
    genre: "action",
    isNew: false,
    description: "",
    image: "",
  },
  {
    id: "2",
    name: "Product 2",
    price: 49.99,
    genre: "action",
    isNew: false,
    description: "",
    image: "",
  },
];

describe("CheckoutBox", () => {
  it("should render properly with product details", () => {
    render(<CheckoutBox products={mockProducts} />);

    const orderSummaryTitle = screen.getByText("Order Summary");
    expect(orderSummaryTitle).toBeInTheDocument();

    const itemsCountText = screen.getByText("2 items");
    expect(itemsCountText).toBeInTheDocument();

    mockProducts.forEach((product) => {
      const productName = screen.getByText(product.name);
      expect(productName).toBeInTheDocument();
      const productPrice = screen.getByText(`$${product.price.toFixed(2)}`);
      expect(productPrice).toBeInTheDocument();
    });

    const orderTotal = screen.getByText("$79.98");
    expect(orderTotal).toBeInTheDocument();
  });

  it("should render properly with no products", () => {
    render(<CheckoutBox />);

    const orderTotal = screen.getByText("$0.00");
    expect(orderTotal).toBeInTheDocument();
  });
});
