<script lang="ts">
    import type { BeatmapDTO } from "$types/common.ts";
    import Copy from "$components/Icons/Copy.svelte";
    import OsuDirect from "$components/Icons/OsuDirect.svelte";
    function getSource(id: number) {
        return `http://assets.ppy.sh/beatmaps/${id}/covers/cover.jpg`;
    }
    let { beatmap }: { beatmap: BeatmapDTO } = $props();
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
            <Copy
                beatmapId={beatmap.beatmapId}
                beatmapsetId={beatmap.beatmapsetId}
            />
            <OsuDirect beatmapId={beatmap.beatmapId} />
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
        display: flex;
        flex-direction: column;
        overflow: hidden;
        white-space: nowrap; /* Don't forget this one */
        text-overflow: ellipsis;
    }
    .metadata-side p {
        max-width: min-content;
        overflow: hidden;
        white-space: nowrap; /* Don't forget this one */
        text-overflow: ellipsis;
    }
    .button-side {
        width: 100%;
        max-width: 40px;
        height: auto;
        max-height: 120px;
    }
</style>
