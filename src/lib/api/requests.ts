import { Result, ResultAsync } from "neverthrow";
import type { Token } from "$components/Stores/CookieStore.svelte.ts";
import {
    type GetRequestsQuery,
    type GetSearchQuery,
    intoQueryString,
    type QueryParams,
} from "$types/queries.ts";
import type {
    PostRequestBody,
    PostSelfNamedRequestBody,
    PostSelfRequestBody,
} from "$types/requests.ts";
import type {
    GetBeatmapQueryResponse,
    GetPlayerQueryResponse,
    GetRequestsResponse,
    GetUserResponse,
} from "$types/responses.ts";

/** Base endpoint for API interactions */
const BASE_PATH = import.meta.env.VITE_IRAI_API;
export type FetchError = {
    message: string;
};
export type DeserializationError = {
    message: string;
    data: string;
};
export type FetchErrors = FetchError | DeserializationError;
const toFetchError = (endpoint: string, e: any): FetchError => ({
    message: `Failed to fetch ${endpoint}: ${e}`,
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
): Promise<Result<GetUserResponse, FetchErrors>> {
    return getData<GetUserResponse>(token, "users/own");
}
export function getUserData(
    user: GetRequestsQuery,
    token: Token,
): Promise<Result<GetUserResponse, FetchErrors>> {
    return getData<GetUserResponse>(token, "users", user);
}
export function getSelfRequests(
    token: Token,
): Promise<Result<GetRequestsResponse[], FetchErrors>> {
    return getData<GetRequestsResponse[]>(token, "requests/own");
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
): Promise<Result<GetRequestsResponse[], FetchErrors>> {
    return getData<GetRequestsResponse[]>(token, "requests", body);
}

export function postRequest(
    token: Token,
    body: PostRequestBody,
): Promise<Result<Response, FetchErrors>> {
    return postData(token, "requests", body);
}

export function postNamedSelfRequest(
    token: Token,
    body: PostSelfNamedRequestBody,
): Promise<Result<Response, FetchErrors>> {
    return postData(token, "requests/own", body);
}

export async function deleteSelfRequest(token: Token, id: number) {
    const headers = new Headers();
    headers.append("Cookie", `iraiLogin=${token}`);
    const url = new URL("requests/own", BASE_PATH);
    url.search = `?requestId=${id}`;
    return ResultAsync.fromPromise(
        fetch(url, {
            credentials: "include",
            method: "DELETE",
            headers: headers,
        }),
        (e) => toFetchError("requests/own", e),
    );
}

async function getData<T>(
    token: Token,
    endpoint: string,
    query?: QueryParams | undefined,
): Promise<Result<T, FetchErrors>> {
    return fetchFromEndpoint(token, endpoint, query).andThen((res) =>
        jsonFromResponse<T>(res, endpoint),
    );
}

async function postData(
    token: Token,
    endpoint: string,
    body: any,
): Promise<Result<Response, FetchErrors>> {
    const headers = new Headers();
    headers.append("Cookie", `iraiLogin=${token}`);
    headers.append("Content-Type", "application/json");
    const url = new URL(endpoint, BASE_PATH);
    return ResultAsync.fromPromise(
        fetch(url, {
            credentials: "include",
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        }),
        (e) => toFetchError(endpoint, e),
    );
}

function fetchFromEndpoint(
    token: Token,
    endpoint: string,
    query: QueryParams | undefined,
): ResultAsync<Response, FetchError> {
    const headers = new Headers();
    headers.append("Cookie", `iraiLogin=${token}`);
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
        (e) => toFetchError(endpoint, e),
    );
}

function jsonFromResponse<T>(
    response: Response,
    endpoint: string,
): ResultAsync<T, DeserializationError> {
    return ResultAsync.fromPromise(response.json(), () =>
        toDeserializationError(endpoint, response.statusText),
    );
}
