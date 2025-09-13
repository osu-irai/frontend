import { err, ok, Result } from "neverthrow";
import { ParseError } from "$types/errors";
import { type PostSelfNamedRequestBody } from "$types/requests.ts";
import { getValueFromForm, parseValueFromRegex } from "$lib/utils/forms.ts";

function getPlayerFromForm(form: FormData): Result<string, ParseError> {
  return getValueFromForm(
    form,
    "destination",
    ParseError.PlayerFormFetchError,
  );
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

export function parsePlayerId(player: string): Result<string, ParseError> {
  return ok(player);
}

export type BeatmapId = number & { readonly __tag: unique symbol };

function BeatmapId(id: number): BeatmapId {
  return id as BeatmapId;
}

export function parseFormData(
  form: FormData,
): Result<PostSelfNamedRequestBody, ParseError> {
  const playerId = getPlayerFromForm(form).andThen(parsePlayerId);
  const beatmapId = getBeatmapFromForm(form).andThen(parseBeatmapId);

  if (playerId.isErr()) {
    return err(playerId.error);
  }
  if (beatmapId.isErr()) {
    return err(beatmapId.error);
  }
  return ok({
    destinationName: playerId.value,
    beatmapId: beatmapId.value,
  });
}
