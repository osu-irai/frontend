import { type Token } from "../../../src/lib/components/Stores/CookieStore.svelte.ts";
import { err, ok, Result, ResultAsync } from "neverthrow";
import type {
  GetBeatmapQueryResponse,
  GetPlayerQueryResponse,
  GetRequestsResponse,
  GetUserSelfResponse,
} from "./types/responses.ts";

import "./types/queries.ts";
import {
  type GetRequestsQuery,
  type GetSearchQuery,
  intoQueryString,
  type QueryParams,
} from "./types/queries.ts";
import { type PostRequestBody } from "./types/requests.ts";

/** Base endpoint for API interactions */
const BASE_PATH = "http://localhost:5077/api/";
export type FetchError = {
  message: string;
};
export type DeserializationError = {
  message: string;
  data: string;
};
export type FetchErrors = FetchError | DeserializationError;
const toFetchError = (endpoint: string): FetchError => ({
  message: `Failed to fetch ${endpoint}`,
});
const toDeserializationError = (
  endpoint: string,
  data: string,
): DeserializationError => ({
  message: `Failed to deserialize data from ${endpoint}`,
  data: data,
});

export function getSelfData(
  token: Token,
): Promise<Result<GetUserSelfResponse, FetchErrors>> {
  return getData<GetUserSelfResponse>(token, "users/self");
}
export function getSelfRequests(
  token: Token,
): Promise<Result<GetRequestsResponse, FetchErrors>> {
  return getData<GetRequestsResponse>(token, "requests/self");
}
export function getSearchPlayer(
  token: Token,
  params: string,
): Promise<Result<GetPlayerQueryResponse, FetchErrors>> {
  const gsq: GetSearchQuery = {
    query: params,
  };
  return getData<GetPlayerQueryResponse>(token, "search/player", gsq);
}

export function getSearchBeatmap(
  token: Token,
  params: string,
): Promise<Result<GetBeatmapQueryResponse, FetchErrors>> {
  const gsq: GetSearchQuery = {
    query: params,
  };
  return getData<GetBeatmapQueryResponse>(token, "search/beatmap", gsq);
}

export function getRequest(
  token: Token,
  body: GetRequestsQuery,
): Promise<Result<GetRequestsResponse, FetchErrors>> {
  return getData<GetRequestsResponse>(token, "requests", body);
}

export function postRequest(
  token: Token,
  body: PostRequestBody,
): Promise<Result<Response, FetchErrors>> {
  return postData(token, "requests/self", body);
}

async function getData<T>(
  token: Token,
  endpoint: string,
  query?: QueryParams | undefined,
): Promise<Result<T, FetchErrors>> {
  return await fetchFromEndpoint(token, endpoint, query).andThen((res) =>
    jsonFromResponse<T>(res, endpoint)
  );
}

async function postData(
  token: Token,
  endpoint: string,
  body: any,
): Promise<Result<Response, FetchErrors>> {
  const headers = new Headers();
  headers.append("Cookie", `osuToken=${token}`);
  const url = new URL(endpoint, BASE_PATH);
  return ResultAsync.fromPromise(
    fetch(url, {
      credentials: "include",
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }),
    () => toFetchError(endpoint),
  );
}

function fetchFromEndpoint(
  token: Token,
  endpoint: string,
  query: QueryParams | undefined,
): ResultAsync<Response, FetchError> {
  const headers = new Headers();
  headers.append("Cookie", `osuToken=${token}`);
  const url = new URL(endpoint, BASE_PATH);
  if (query !== undefined) {
    url.search = intoQueryString(query);
  }
  return ResultAsync.fromPromise(
    fetch(url, {
      credentials: "include",
      method: "GET",
      headers: headers,
    }),
    () => toFetchError(endpoint),
  );
}

function jsonFromResponse<T>(
  response: Response,
  endpoint: string,
): ResultAsync<T, DeserializationError> {
  return ResultAsync.fromPromise(
    response.json(),
    () => toDeserializationError(endpoint, response.statusText),
  );
}
