<script lang="ts">
    let {
        isVisible,
        parentPosition,
    }: {
        isVisible: boolean;
        parentPosition: DOMRect | undefined;
    } = $props();
    let left = $derived.by(() => {
        const inner = parentPosition?.left!;
        return inner - 30;
    });
    const signout = `${import.meta.env.VITE_IRAI_API}oauth/signout`;
</script>

{#if isVisible}
    <div class="sticky" style="left: {left}px; top: 50px;">
        <a href="/requests" onclick={() => (isVisible = false)}>Your requests</a
        >
        <a href={signout} onclick={() => (isVisible = false)}
            >Quit</a
        >
    </div>
{/if}

<style lang="scss">
    .sticky {
        border-color: var(--ctp-macchiato-overlay2);
        border-style: solid;
        border-width: 2px;
        background-color: var(--ctp-macchiato-surface0);
        padding: 10px;
        margin: 20px;
        display: flex;
        position: absolute;
        flex-direction: column;
        z-index: 1;
    }
</style>
