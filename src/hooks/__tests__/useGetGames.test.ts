import { renderHook, act } from "@testing-library/react";
import { useGetGames } from "@/hooks/useGetGames";
import { GamesResponse, getGames } from "@/services/games";

jest.mock("@/services/games", () => ({
  getGames: jest.fn(),
}));

describe("useGetGames hook", () => {
  const mockSuccessData: GamesResponse = {
    games: [
      {
        id: "1",
        name: "Game 1",
        genre: "",
        image: "",
        description: "",
        price: 0,
        isNew: false,
      },
      {
        id: "2",
        name: "Game 2",
        genre: "",
        image: "",
        description: "",
        price: 0,
        isNew: false,
      },
    ],
    availableFilters: ["Action", "Adventure"],
    totalPages: 5,
    currentPage: 1,
  };

  const mockError = new Error("Failed to fetch games");

  it("should fetch games successfully and update state", async () => {
    (getGames as jest.Mock).mockResolvedValue(mockSuccessData);

    const { result } = renderHook(() =>
      useGetGames({ genre: "Action", page: 1 }),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.fetch({ genre: "Action", page: 1 });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockSuccessData);
    expect(result.current.error).toBeNull();
  });

  it("should handle errors correctly", async () => {
    (getGames as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useGetGames({ genre: "Action", page: 1 }),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.fetch({ genre: "Action", page: 1 });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Failed to fetch games");
  });

  it("should call onSuccess when the fetch is succeeded", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    (getGames as jest.Mock).mockResolvedValue(mockSuccessData);

    const { result } = renderHook(() =>
      useGetGames({ genre: "Action", page: 1 }, { onSuccess, onFailure }),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.fetch(
        { genre: "Action", page: 1 },
        { onSuccess, onFailure },
      );
    });

    expect(onSuccess).toHaveBeenCalledWith(mockSuccessData);
    expect(onFailure).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockSuccessData);
    expect(result.current.error).toBeNull();
  });

  it("should trigger onFailure when there is an error", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    (getGames as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useGetGames({ genre: "Action", page: 1 }, { onSuccess, onFailure }),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.fetch(
        { genre: "Action", page: 1 },
        { onSuccess, onFailure },
      );
    });

    expect(onFailure).toHaveBeenCalledWith(mockError);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Failed to fetch games");
  });

  it("should set error message when fetch fails", async () => {
    const mockError = new Error();

    (getGames as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() =>
      useGetGames({ genre: "Action", page: 1 }),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.fetch({ genre: "Action", page: 1 });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Failed to fetch games");
  });

  it("should not fetch games automatically if autoFetch is false", async () => {
    (getGames as jest.Mock).mockResolvedValue(mockSuccessData);

    const { result } = renderHook(
      (props) => useGetGames(props.queryParams, { autoFetch: false }),
      {
        initialProps: { queryParams: { genre: "Action", page: 1 } },
      },
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.fetch({ genre: "Action", page: 1 });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockSuccessData);
    expect(result.current.error).toBeNull();
  });
});
