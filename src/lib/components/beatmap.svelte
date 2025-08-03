<script lang="ts">
import type { BeatmapDto } from "../../api/gen";
import Copy from "./icons/Copy.svelte";
import OsuDirect from "./icons/OsuDirect.svelte";
function getSource(id: number) {
    return `http://assets.ppy.sh/beatmaps/${id}/covers/cover.jpg`;
}
let { beatmap }: { beatmap: BeatmapDto } = $props();
let source = getSource(beatmap.beatmapsetId);
</script>

<div class="beatmap card-size">
  <img
    class="card-size"
    src={source}
    loading="lazy"
    alt="Background image of beatmap {beatmap.title}"
  />
  <div class="inner-data card-size">
    <div class="metadata-side">
      <p>{beatmap.title} - {beatmap.artist}</p>
      <p>[{beatmap.difficulty}]</p>
    </div>
    <div class="button-side">
      <Copy beatmapId={beatmap.beatmapId} beatmapsetId={beatmap.beatmapsetId} />
      <OsuDirect beatmapsetId={beatmap.beatmapsetId} />
    </div>
  </div>
</div>

<style lang="scss">
  @use "sass:color";
  .beatmap {
    overflow: hidden;
    position: relative;
  }
  .card-size {
    min-height: 120px;
    height: auto;
    max-height: 250px;
  }
  p {
    margin: 20px;
  }
  img {
    pointer-events: none;
    position: fixed;
    width: 100%;
    object-fit: cover;
    z-index: -1;
    filter: brightness(40%);
  }
  .inner-data {
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    flex-direction: row;
    justify-content: space-between;
  }
  .metadata-side {
    height: 100%;
  }
  .button-side {
    width: 100%;
    max-width: 40px;
    height: auto;
    max-height: 120px;
  }
  .beatmap:hover > .button-side {
    display: flex;
    flex-direction: column;
  }
</style>
