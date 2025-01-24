import { Env } from '@stencil/core';

const BASE_URL = 'https://api.themoviedb.org/3';
const headers = { Authorization: `Bearer ${Env.BEARER_TOKEN}` };
/* 
https://api.themoviedb.org/3/discover/movie

https://api.themoviedb.org/3/discover/tv

https://api.themoviedb.org/3/trending/all/day

https://api.themoviedb.org/3/tv/id?

https://api.themoviedb.org/3/movie/id?

https://api.themoviedb.org/3/person/84958
*/

export type MediaType = 'movie' | 'tv';

export type ExtendedType = 'all' | 'movie' | 'tv' | 'person';

export interface TrendingParams {
  type: ExtendedType;
  time_window: 'day' | 'week';
}

export interface DiscoverParams {
  type: MediaType;
  with_genres: string;
}

export interface GetByIDParams {
  type: string;
  id: number;
}

export interface SearchParams {
  type: ExtendedType;
  query: string;
}

/**
 * Makes a request to the discover endpoint.
 *
 * @param {Object} params - The parameters for the request.
 * @param {string} params.type - The type for the discovery (e.g., "movie" or "tv" or "person" or "all").
 * @param {string} params.with_genres - A comma-separated string of genre IDs.
 * @returns {Promise<any>} The JSON response from the API.
 * @throws {Error} If the request fails or returns an error.
 */
async function discover({ type, with_genres }: DiscoverParams): Promise<any> {
  let url = `/discover/${type.trim()}`;
  if (with_genres) {
    url += `?with_genres=${with_genres}`;
  }

  const path = BASE_URL + url;
  const response = await fetch(path, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches trending items based on the type and time window.
 *
 * @param {Object} params - The parameters for the request.
 * @param {string} params.type - The type of item to fetch (e.g., "movie", "tv").
 * @param {string} params.time_window - The time window for the trending items (e.g., "day" or "week").
 * @returns {Promise<any>} The JSON response from the API.
 * @throws {Error} If the request fails or returns an error.
 */
async function getTrending({ type, time_window }: TrendingParams): Promise<any> {
  const url = `/trending/${type}/${time_window}`;
  const path = BASE_URL + url;
  const response = await fetch(path, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches an item by its ID from the specified type.
 *
 * @param {Object} params - The parameters for the request.
 * @param {string} params.type - The type of item (e.g., "movie", "tv", "person").
 * @param {number} params.id - The ID of the item to fetch.
 * @returns {Promise<any>} The JSON response from the API.
 * @throws {Error} If the request fails or returns an error.
 */
async function getByID({ type, id }: GetByIDParams): Promise<any> {
  const url = `/${type}/${id}`;
  const path = BASE_URL + url;
  const response = await fetch(path, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}

async function search({ type, query }: SearchParams) {
  const url = `/search/${type}?${query}`;

  const path = BASE_URL + url;
  const response = await fetch(path, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}

export { discover, getTrending, getByID, search };
