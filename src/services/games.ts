import apiClient from "@/services/api";
import { Game } from "@/utils/endpoint";

export interface GamesQueryParams {
  genre?: string;
  page?: number;
}

export interface GamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

export async function getGames(
  queryParams?: GamesQueryParams,
): Promise<GamesResponse> {
  try {
    const queryString = queryParams
      ? `?genre=${queryParams.genre ?? ""}&page=${queryParams.page ?? 1}`
      : "";

    const response = await apiClient.get(`/games${queryString}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch games", error as Error);
  }
}
