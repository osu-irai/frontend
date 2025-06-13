const beatmapRegex: RegExp = RegExp(
  /(?:https:\/\/osu\.ppy\.sh\/beatmapsets\/\d+#[a-z]*\/)?(\d+)(?:\/.*)?/,
);
export function parseBeatmapId(beatmap: string): BeatmapId | null {
  const capture = beatmapRegex.exec(beatmap);
  const beatmapId = capture?.[1] ?? "";
  return parseInt(beatmapId) as BeatmapId;
}

const playerRegex: RegExp = RegExp(
  /(?:https:\/\/osu\.ppy\.sh\/users\/)?(\d+)(?:\/.*)?/,
);
export function parsePlayerId(player: string): PlayerId | null {
  const capture = playerRegex.exec(player);
  const playerId = capture?.[1] ?? "";

  return parseInt(playerId) as PlayerId;
}

type BeatmapId = number & { readonly __tag: unique symbol };
type PlayerId = number & { readonly __tag: unique symbol };

export function parseFormData(form: FormData): [PlayerId, BeatmapId] | null {
  const player = form.get("destination")?.toString();
  if (player === undefined) {
    return null;
  }
  const beatmap = form.get("beatmap")?.toString();
  if (beatmap === undefined) {
    return null;
  }
  const playerId = parsePlayerId(player);
  if (playerId === null) {
    return null;
  }
  const beatmapId = parseBeatmapId(beatmap);
  if (beatmapId === null) {
    return null;
  }
  return [playerId, beatmapId];
}
