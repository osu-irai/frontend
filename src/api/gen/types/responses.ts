/**
 * Response types for API requests
 * @module
 */
import type { BeatmapDTO, UserDTO } from "./common.ts";

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

/**
 * Response return type for "GET /search/player"
 * @property {Array<UserDTO>} players - Players found through query
 * @property {number} count - Total player count found
 */
export type GetPlayerQueryResponse = {
  players: Array<UserDTO>;
  count: number;
};
/**
 * Response return type for "GET /search/beatmap"
 * @property {Array<UserDTO>} players - Players found through query
 * @property {number} count - Total player count found
 */
export type GetBeatmapQueryResponse = {
  maps: Array<BeatmapDTO>;
  count: number;
};
