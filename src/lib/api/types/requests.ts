/**
 * Request body/query types for API requests
 * @module
 */

/**
 * Request body for "POST /request"
 * @property {number} sourceId - ID of the player creating the request
 * @property {number} destinationId - ID of the player receiving the request
 * @property {number} beatmapId - ID of the beatmap being requested. Requires a difficulty ID, not beatmapset
 */
export type PostRequestBody = {
    sourceId: number;
    destinationId: number;
    beatmapId: number;
};

/**
 * Request body for "POST /self/request"
 * @property {number} destinationId - ID of the player receiving the request
 * @property {number} beatmapId - ID of the beatmap being requested. Requires a difficulty ID, not beatmapset
 */
export type PostSelfRequestBody = {
    destinationId: number;
    beatmapId: number;
};

/**
 * Request body for "POST /self/request/named"
 * @property {string} destinationName - Name of the player receiving the request
 * @property {number} beatmapId - ID of the beatmap being requested. Requires a difficulty ID, not beatmapset
 */
export type PostSelfNamedRequestBody = {
    destinationName: string;
    beatmapId: number;
};
