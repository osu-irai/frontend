import type { StringRepresentable as ToStringable } from "./util.ts";

export type QueryParams = Record<string, ToStringable>;
/**
 * Request query parameters for "GET /request"
 * @property {number} playerId - ID of the player being fetched
 */
export type GetRequestsQuery = QueryParams & {
    playerId: number;
};

/**
 * Request query parameters for "GET /search"
 * @property {string} query - Username query
 */
export type GetSearchQuery = QueryParams & {
    query: string;
};

/**
 * Returns query as a query parameter string
 * @param {QueryParams} query - Query type
 */
export function intoQueryString(query: QueryParams): string {
    const params = new URLSearchParams();
    (Object.keys(query) as Array<keyof QueryParams>).forEach((key) =>
        params.append(key, query[key].toString()),
    );
    return params.toString();
}
