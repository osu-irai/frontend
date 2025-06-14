import { err, ok, Result } from "neverthrow";
import { ParseError } from "$lib/types/errors";
import { getValueFromForm, parseValueFromRegex } from "$utils/forms";

function getPlayerFromForm(form: FormData): Result<string, ParseError> {
  return getValueFromForm(form, "destination", ParseError.PlayerFormFetchError);
}

function getBeatmapFromForm(form: FormData): Result<string, ParseError> {
  return getValueFromForm(form, "beatmap", ParseError.BeatmapFormFetchError);
}

const beatmapRegex: RegExp = RegExp(
  /(?:https:\/\/osu\.ppy\.sh\/beatmapsets\/\d+#[a-z]*\/)?(\d+)(?:\/.*)?/,
);
export function parseBeatmapId(beatmap: string): Result<BeatmapId, ParseError> {
  return parseValueFromRegex<ParseError>(
    beatmap,
    beatmapRegex,
    ParseError.BeatmapParseError,
  ).map(BeatmapId);
}

const playerRegex: RegExp = RegExp(
  /(?:https:\/\/osu\.ppy\.sh\/users\/)?(\d+)(?:\/.*)?/,
);
export function parsePlayerId(player: string): Result<PlayerId, ParseError> {
  return parseValueFromRegex<ParseError>(
    player,
    playerRegex,
    ParseError.PlayerParseError,
  ).map(PlayerId);
}

export type BeatmapId = number & { readonly __tag: unique symbol };
export type PlayerId = number & { readonly __tag: unique symbol };

function BeatmapId(id: number): BeatmapId {
  return id as BeatmapId;
}
function PlayerId(id: number): PlayerId {
  return id as PlayerId;
}

export type CreateRequestData = {
  player: PlayerId;
  beatmap: BeatmapId;
};

export function parseFormData(
  form: FormData,
): Result<CreateRequestData, ParseError> {
  const playerId = getPlayerFromForm(form).andThen(parsePlayerId);
  const beatmapId = getBeatmapFromForm(form).andThen(parseBeatmapId);

  if (playerId.isErr()) {
    return err(playerId.error);
  }
  if (beatmapId.isErr()) {
    return err(beatmapId.error);
  }
  return ok({
    player: playerId.value,
    beatmap: beatmapId.value,
  });
}
