<script lang="ts">
    import type {BeatmapDto} from "../api/gen";
    function getSource(id: number) {
        return `http://assets.ppy.sh/beatmaps/${id}/covers/cover.jpg`
    }
    let { data } = $props();
    let beatmap: BeatmapDto = data;
    console.log(data);
    let source = getSource(beatmap.beatmapsetId);
</script>

<div class="beatmap card-size">
    <img src={source} loading="lazy" alt="Background image of beatmap {beatmap.title}">
    <p>{beatmap.title} - {beatmap.artist}</p>
    <p>[{beatmap.difficulty}]</p>
</div>

<style lang="scss">
    @use "sass:color";
    .beatmap {
      overflow: hidden;
      position: relative;
    }
    .card-size {
      min-height: auto;
      max-height: 250px;
    }
    p {
        margin: 20px;
    }
    img {
      pointer-events: none;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: brightness(40%);
    }
</style>