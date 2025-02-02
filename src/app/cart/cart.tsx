"use client";

import { useLocalStorage } from "usehooks-ts";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Game } from "@/utils/endpoint";
import Link from "next/link";
import CartItem from "@/components/CartItem";
import Image from "next/image";
import CheckoutBox from "@/components/CheckoutBox";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import Loading from "../loading";
import { useNotification } from "@/hooks";

export default function CartView() {
  const [isClient, setIsClient] = useState(false);
  const { notify } = useNotification();

  const [cartStorage, setCartStorage, clearCartStorage] = useLocalStorage<
    Game[]
  >("cart", []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemove = (game: Game) => () => {
    notify({
      type: "info",
      message: `Removed ${game.name} from cart`,
      title: "Game Removed",
    });
    setCartStorage(
      cartStorage.filter((gameOnCart) => gameOnCart.id !== game.id),
    );
  };

  const handleCheckout = () => {
    clearCartStorage();
    notify({
      type: "success",
      message: "Checkout successful.",
      title: "Checkout",
    });
  };

  if (!isClient) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col items-center min-h-[calc(100vh-240px)] pb-8">
      <header className="flex flex-col items-center w-full py-8 px-6 sm:px-12">
        <div className="max-w-screen-xl w-full">
          <Link
            className="flex flex-row items-center gap-2 text-base"
            href={"/"}
          >
            <ArrowLeftIcon className="size-5" />
            Back to Catalog
          </Link>
        </div>
      </header>
      <section className="flex flex-col items-center w-full gap-12 px-6 sm:px-12">
        <div className="flex flex-col gap-12 max-w-screen-xl w-full">
          <div>
            <h1 className="text-neutral-dark font-bold text-2xl">Your Cart</h1>
            <span className="text-primary text-base">
              {cartStorage.length} {cartStorage.length === 1 ? "item" : "items"}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center lg:items-stretch lg:flex-row lg:justify-between gap-12">
            <div className="flex flex-col justify-between divide-y divide-stroke-secondary">
              <span className="sr-only">Cart Items</span>
              {cartStorage.length === 0 ? (
                <div className="text-center text-neutral-dark font-semibold text-lg py-5">
                  Your cart is empty. Add some games to the cart to proceed!
                </div>
              ) : (
                cartStorage.map((game) => (
                  <CartItem
                    className="py-5 max-w-full lg:max-w-2xl"
                    title={game.name}
                    key={game.id}
                    genre={game.genre}
                    description={game.description}
                    price={game.price}
                    isNew={game.isNew}
                    img={
                      <Image
                        alt={game.name}
                        src={game.image}
                        title={game.name}
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-full h-auto"
                        priority
                      />
                    }
                    onRemove={handleRemove(game)}
                  />
                ))
              )}
            </div>
            <div className="flex flex-col gap-10 grow lg:max-w-lg w-full">
              <CheckoutBox className="w-full" products={cartStorage} />
              <Button
                onClick={handleCheckout}
                disabled={cartStorage.length === 0}
                fluid
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
