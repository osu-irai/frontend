import { Token } from "../../lib/components/Stores/CookieStore.svelte.ts";
import { err, ok, Result, ResultAsync } from "neverthrow";
import type {
    GetRequestsResponse,
    GetUserSelfResponse,
} from "./types/responses.ts";
import { GetRequestsQuery, QueryParams } from "./types/queries.ts";

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

export const getSelfData = (
    token: Token,
): Promise<Result<GetUserSelfResponse, FetchErrors>> =>
    getData<GetUserSelfResponse>(token, "users/self");
export const getSelfRequests = (
    token: Token,
): Promise<Result<GetRequestsResponse, FetchErrors>> =>
    getData<GetRequestsResponse>(token, "requests/self");

export const getRequest = (
    token: Token,
    body: GetRequestsQuery,
): Promise<Result<GetRequestsResponse, FetchErrors>> =>
    getData<GetRequestsResponse>(token, "requests", body);

async function getData<T>(
    token: Token,
    endpoint: string,
    query?: QueryParams | undefined,
): Promise<Result<T, FetchErrors>> {
    return await fetchFromEndpoint(token, endpoint, query).andThen((res) =>
        jsonFromResponse<T>(res, endpoint),
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
        url.search = query.toString();
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
    return ResultAsync.fromPromise(response.json(), () =>
        toDeserializationError(endpoint, response.statusText),
    );
}
