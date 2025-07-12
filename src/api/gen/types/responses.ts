/**
 * Response types for API requests
 * @module
 */
import type { BeatmapDTO, UserDTO } from "./common";

/**
 * Response return type for "GET /users/self"
 * @property {UserDTO} user - Information about the user
 * @property {number} requestCount - Amount of requests a user has
 */
export type GetUserSelfResponse = {
    user: UserDTO;
    requestCount: number;
};

/**
 * Response return type for "GET /request"
 * @property {number} id - Request ID. Incremental, should be unique
 * @property {BeatmapDTO} beatmap - Beatmap information
 * @property {UserDTO} from - Information about the author of the request
 */
export type GetRequestsResponse = {
    id: number;
    beatmap: BeatmapDTO;
    from: UserDTO;
};
