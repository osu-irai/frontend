/**
 * @module
 * Shared types across {@see ./requests.ts}, {@see ./responses.ts}.
 * Primarily includes DTOs.
 */
/**
 * Beatmap data transfer object
 * @property {number} beatmapId - Difficulty ID as per osu!api
 * @property {number} beatmapsetId - Beatmap set ID as per osu!api
 * @property {string} artist - Artist
 * @property {string} title - Song title
 * @property {string} difficulty - Difficulty name
 * @property {number} stars - Nomod star rating of the map
 */
export type BeatmapDTO = {
    beatmapId: number;
    beatmapsetId: number;
    artist: string;
    title: string;
    difficulty: string;
    stars: number;
};

/**
 * User data transfer object
 * @property {number} id - User ID as per osu!api
 * @property {string} username - Username
 * @property {URL} avatarUrl - a.ppy.sh link to the avatar of the user
 */
export type UserDTO = {
    id: number;
    username: string;
    avatarUrl: URL;
};

/**
 * Problem details object as defined per [RFC 7807](https://www.rfc-editor.org/rfc/rfc7807)
 * @property {string} type - Problem type as defined per [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986)
 * @property {string} title - Summary of the problem type
 * @property {number} status - HTTP status code as defined per [RFC 7231 Section 6](https://www.rfc-editor.org/rfc/rfc7231)
 * @property {string} detail - Human-readable explanation for the specific error
 * @property {string} instance - URI reference of the specific occurance of the error
 */
export type ProblemDetails = {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
};
