<script lang="ts">
  const {
    isVisible,
    parentPosition,
  }: {
    isVisible: boolean;
    parentPosition: DOMRect | undefined;
  } = $props();
  let right = $derived(parentPosition?.left ?? 0);
</script>

{#if isVisible}
  <div class="sticky" style="left: {right}px; top: 60px;">
    <a href="/requests">Your requests</a>
    <a href="/api/oauth/signout">Quit</a>
  </div>
{/if}

<style lang="scss">
  .sticky {
    border-color: var(--ctp-macchiato-flamingo);
    border-style: solid;
    border-width: 3px;
    padding: 10px;
    margin: 20px;
    display: flex;
    position: absolute;
    flex-direction: column;
    z-index: 1;
  }
</style>
