import { err, ok, Result } from "neverthrow";
import { ParseError } from "../../app";

function fetchPlayer(form: FormData): Result<string, ParseError> {
  const playerEntry = form.get("destination");
  return (playerEntry === null)
    ? err(ParseError.PlayerFetchError)
    : ok(playerEntry.toString());
}

function fetchBeatmap(form: FormData): Result<string, ParseError> {
  const beatmapEntry = form.get("beatmap");
  return (beatmapEntry === null)
    ? err(ParseError.BeatmapFetchError)
    : ok(beatmapEntry.toString());
}

const beatmapRegex: RegExp = RegExp(
  /(?:https:\/\/osu\.ppy\.sh\/beatmapsets\/\d+#[a-z]*\/)?(\d+)(?:\/.*)?/,
);
export function parseBeatmapId(beatmap: string): Result<BeatmapId, ParseError> {
  const capture = beatmapRegex.exec(beatmap);
  const beatmapId = capture?.[1];
  return (beatmapId === undefined)
    ? err(ParseError.BeatmapParseError)
    : ok(parseInt(beatmapId) as BeatmapId);
}

const playerRegex: RegExp = RegExp(
  /(?:https:\/\/osu\.ppy\.sh\/users\/)?(\d+)(?:\/.*)?/,
);
export function parsePlayerId(player: string): Result<PlayerId, ParseError> {
  const capture = playerRegex.exec(player);
  const playerId = capture?.[1];
  return (playerId === undefined)
    ? err(ParseError.PlayerParseError)
    : ok(parseInt(playerId) as PlayerId);
}

export type BeatmapId = number & { readonly __tag: unique symbol };
export type PlayerId = number & { readonly __tag: unique symbol };

export function parseFormData(
  form: FormData,
): Result<[PlayerId, BeatmapId], ParseError> {
  const playerId = fetchPlayer(form).andThen(parsePlayerId);
  const beatmapId = fetchBeatmap(form).andThen(parseBeatmapId);

  if (playerId.isErr()) {
    return err(playerId.error);
  }
  if (beatmapId.isErr()) {
    return err(beatmapId.error);
  }
  return ok([
    playerId.value,
    beatmapId.value,
  ]);
}
