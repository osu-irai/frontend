<script lang="ts">
    let { beatmapsetId, beatmapId } = $props();

    const copyToClipboard = async () => {
        const url = `https://osu.ppy.sh/beatmaps/${beatmapId}`;
        await navigator.clipboard.writeText(url);
    };
</script>

<div>
    <button
        aria-label="Copy beatmap link to clipboard"
        onclick={() => copyToClipboard()}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
            ><path
                fill="currentColor"
                d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"
            /></svg
        >
    </button>
</div>

<style lang="scss">
    div {
        height: 50%;
        width: 100%;
        border: none;
        display: hidden;
    }
    button {
        display: none;
        border: none;
        width: 100%;
        height: 100%;
    }
    div:hover button {
        display: block;
    }
    button svg {
        color: var(--ctp-macchiato-base);
    }
    button:hover {
        background-color: var(--ctp-macchiato-sky);
    }
</style>
