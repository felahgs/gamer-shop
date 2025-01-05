"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import Loading from "./loading";

import ProductCard from "@/components/ProductCard";
import Select from "@/components/Select/Select";
import Button from "@/components/Button";

import { Game } from "@/utils/endpoint";
import { useGetGames } from "@/hooks/useGetGames";
import { useLocalStorage } from "usehooks-ts";
import { GamesResponse } from "@/services/games";

export default function CatalogView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") ?? "";

  const [games, setGames] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenre] = useState(genre);
  const { data, error, loading, fetch } = useGetGames({ genre: genre });

  const { currentPage = 0, totalPages = 0 } = data || {};
  const showSeeMore = currentPage < totalPages;

  const [cartStorage, setCartStorage] = useLocalStorage<Game[]>("cart", []);

  const gameIsOnCart = (id: string) =>
    !!cartStorage.find((item) => id === item.id);

  const handleGenreChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value;
    setSelectedGenre(selectedGenre);
    const response = await fetch({ page: 1, genre: selectedGenre });
    const { games: fetchedGames } = response as GamesResponse;
    setGames(fetchedGames);
    router.push(selectedGenre ? `?genre=${selectedGenre}` : "/");
  };

  const handleSeeMore = async () => {
    const response = await fetch({ page: currentPage + 1, genre: genre });
    const { games: fetchedGames } = response as GamesResponse;
    setGames([...games, ...fetchedGames]);
  };

  const handleCart = (game: Game) => () => {
    if (gameIsOnCart(game.id)) {
      setCartStorage(
        cartStorage.filter((gameOnCart) => gameOnCart.id !== game.id),
      );
    } else {
      setCartStorage([...cartStorage, game]);
    }
  };

  useEffect(() => {
    if (data && !error && games.length === 0) {
      setGames(data.games);
    }
  }, [data, error, games.length]);

  return (
    <main className="flex flex-col items-center min-h-[calc(100vh-240px)] divide-y divide-stroke-tertiary">
      <header className="flex flex-col items-center w-full py-8 px-6 sm:px-12">
        <div className="max-w-screen-xl w-full">
          <h1 className="font-bold text-4xl pb-9 text-primary">Top Sellers</h1>
          <div className="flex flex-row items-center divide-x divide-stroke-secondary justify-between sm:justify-end">
            <div className="px-6 py-0 font-bold">Genre</div>
            <div className="px-6 grow sm:grow-0">
              <Select
                value={selectedGenre}
                onChange={handleGenreChange}
                className="py-0 min-w-[163px] w-full sm:w-auto"
              >
                <option value="">All</option>
                {data?.availableFilters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </header>

      {(loading && games.length === 0) || genre !== selectedGenre ? (
        <Loading />
      ) : (
        <section className="flex flex-col gap-12 py-8 px-6 sm:px-12 items-center w-full ">
          {games.length > 0 ? (
            <div className="grid grid-cols-1 content-center sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 max-w-screen-xl w-full">
              {games.map((game) => (
                <ProductCard
                  key={game.id}
                  img={
                    <Image
                      src={game.image}
                      alt={game.name}
                      title={game.name}
                      width={332}
                      height={240}
                    />
                  }
                  title={game.name}
                  genre={game.genre}
                  price={game.price}
                  isNew={game.isNew}
                  actions={
                    <Button
                      className="mt-5"
                      fluid
                      variant="secondary"
                      onClick={handleCart(game)}
                    >
                      {gameIsOnCart(game.id)
                        ? "REMOVE FROM CART"
                        : "ADD TO CART"}
                    </Button>
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Oops! No Games Found
              </h2>
              <p className="text-lg text-secondary mb-6">
                We couldn&apos;t find any games matching your selection. Try
                selecting another filet.
              </p>
            </div>
          )}
          {showSeeMore && (
            <div className="w-full max-w-screen-xl">
              <Button
                loading={loading}
                className="self-start"
                onClick={handleSeeMore}
              >
                SEE MORE
              </Button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
