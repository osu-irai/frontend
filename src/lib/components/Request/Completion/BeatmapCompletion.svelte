<script lang="ts">
    import type { BeatmapDTO } from "$types/common.ts";
    function getSource(id: number) {
        return `http://assets.ppy.sh/beatmaps/${id}/covers/cover.jpg`;
    }
    let {
        beatmap,
        click,
    }: { beatmap: BeatmapDTO; click: (id: number) => void } = $props();
    let source = getSource(beatmap.beatmapsetId);
</script>

<button onclick={(_) => click(beatmap.beatmapId)}>
    <img
        class="card-size"
        src={source}
        loading="lazy"
        alt="Background image of beatmap {beatmap.title}"
    />
    <div class="text">
        <p>{beatmap.artist} - {beatmap.title}</p>
        <p>[{beatmap.difficulty}]</p>
    </div>
</button>

<style lang="scss">
    @use "sass:color";
    .beatmap {
        overflow: hidden;
        position: relative;
    }
    .card-size {
        width: 200px;
        height: 80px;
    }
    .text {
        margin-left: 5px;
        margin-right: 5px;
        padding: 5px;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .text p {
        white-space: nowrap;
        overflow: hidden;
    }
    img {
        pointer-events: none;
        height: 100%;
        width: 100%;
        object-fit: cover;
        z-index: -1;
        filter: brightness(30%);
    }
    button {
        padding: 0;
        margin: 5px;
        width: 200px;
        height: 80px;
        appearance: none;
        display: inline-block;
        position: relative;
        color: inherit;
        font-family: inherit;
        background-color: var(--ctp-macchiato-mantle);
        border: none;
        outline: 2px solid var(--ctp-macchiato-overlay0);
    }
    button:hover {
        outline: 2px solid var(--ctp-macchiato-green);
    }
    button:active {
        outline: 2px solid var(--ctp-macchiato-blue);
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
</style>
