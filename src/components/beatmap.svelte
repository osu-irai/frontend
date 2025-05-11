<script lang="ts">
    import type {BeatmapDto} from "../api/gen";

    let { data } = $props();
    let beatmap: BeatmapDto = data;
    let source = `http://assets.ppy.sh/beatmaps/${beatmap.beatmapId}/covers/cover.jpg`;
</script>

<div>
    <img src="{source}" alt="">
    <p>{beatmap.title}</p>
    <p>{beatmap.artist}</p>
</div>

<style>
    div {
        border: red solid 3px;
    }
    p {
        margin: 20px;
    }
</style>