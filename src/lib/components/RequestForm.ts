import { err, ok, type Result } from "neverthrow";
import { ParseError } from "../../app";

const beatmapRegex: RegExp = RegExp(
  /(?:https:\/\/osu\.ppy\.sh\/beatmapsets\/\d+#[a-z]*\/)?(\d+)(?:\/.*)?/,
);
export function parseBeatmapId(beatmap: string): Result<BeatmapId, ParseError> {
  const capture = beatmapRegex.exec(beatmap);
  const beatmapId = capture?.[1] ?? "";
  if (beatmapId === undefined) {
    return err(ParseError.BeatmapParseError);
  }
  return ok(parseInt(beatmapId) as BeatmapId);
}

const playerRegex: RegExp = RegExp(
  /(?:https:\/\/osu\.ppy\.sh\/users\/)?(\d+)(?:\/.*)?/,
);
export function parsePlayerId(player: string): Result<PlayerId, ParseError> {
  const capture = playerRegex.exec(player);
  const playerId = capture?.[1];
  if (playerId === undefined) {
    return err(ParseError.PlayerParseError);
  }
  return ok(parseInt(playerId) as PlayerId);
}

export type BeatmapId = number & { readonly __tag: unique symbol };
export type PlayerId = number & { readonly __tag: unique symbol };

export function parseFormData(
  form: FormData,
): Result<[PlayerId, BeatmapId], string> {
  const player = form.get("destination")?.toString();
  if (player === undefined) {
    return err("Failed to fetch player");
  }
  const beatmap = form.get("beatmap")?.toString();
  if (beatmap === undefined) {
    return err("failed to fetch beatmap");
  }
  const playerId = parsePlayerId(player);
  if (playerId.isErr()) {
    return err("Failed to parse player");
  }
  const beatmapId = parseBeatmapId(beatmap);
  if (beatmapId.isErr()) {
    return err("Failed to parse beatmap");
  }
  return ok([
    playerId.value,
    beatmapId.value,
  ]);
}
