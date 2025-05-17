export function parseBeatmapId(beatmap: string): BeatmapId | null {
  const lastSepar = beatmap.lastIndexOf("/");
  const id = beatmap.slice(lastSepar);
  return parseInt(id) as BeatmapId;
}

// TODO: Stub
export function parsePlayerId(player: string): PlayerId | null {
  return 11482346 as PlayerId;
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
