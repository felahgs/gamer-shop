import { getGames, GamesQueryParams, GamesResponse } from "@/services/games";
import apiClient from "@/services/api";

jest.mock("@/services/api");

describe("getGames service", () => {
  const mockApiResponse: GamesResponse = {
    games: [],
    availableFilters: ["Action", "Adventure", "Puzzle"],
    totalPages: 5,
    currentPage: 1,
  };

  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.log as jest.Mock).mockRestore();
  });

  it("should fetch games with no query params", async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockApiResponse });

    const result = await getGames();

    expect(apiClient.get).toHaveBeenCalledWith("/games");
    expect(result).toEqual(mockApiResponse);
  });

  it("should fetch games with query params", async () => {
    const queryParams: GamesQueryParams = { genre: "Action", page: 2 };
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockApiResponse });

    const result = await getGames(queryParams);

    expect(apiClient.get).toHaveBeenCalledWith("/games?genre=Action&page=2");
    expect(result).toEqual(mockApiResponse);
  });

  it("should handle API errors correctly", async () => {
    const error = new Error("API request failed");
    (apiClient.get as jest.Mock).mockRejectedValue(error);

    await expect(getGames()).rejects.toThrow("Failed to fetch games");
  });

  it("should handle empty genre and page query params", async () => {
    const queryParams: GamesQueryParams = { genre: "", page: 0 };
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockApiResponse });

    const result = await getGames(queryParams);

    expect(apiClient.get).toHaveBeenCalledWith("/games?genre=&page=0");
    expect(result).toEqual(mockApiResponse);
  });

  it("should default to page 1 if no page param is provided", async () => {
    const queryParams: GamesQueryParams = { genre: "Adventure" };
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockApiResponse });

    const result = await getGames(queryParams);

    expect(apiClient.get).toHaveBeenCalledWith("/games?genre=Adventure&page=1");
    expect(result).toEqual(mockApiResponse);
  });

  it("should default genre to an empty string when genre is not provided or is undefined", async () => {
    const queryParams: GamesQueryParams = { page: 1 };
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockApiResponse });

    const result = await getGames(queryParams);

    expect(apiClient.get).toHaveBeenCalledWith("/games?genre=&page=1");
    expect(result).toEqual(mockApiResponse);

    const queryParamsWithUndefined: GamesQueryParams = {
      genre: undefined,
      page: 1,
    };
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockApiResponse });

    const resultWithUndefined = await getGames(queryParamsWithUndefined);

    expect(apiClient.get).toHaveBeenCalledWith("/games?genre=&page=1");
    expect(resultWithUndefined).toEqual(mockApiResponse);
  });
});
