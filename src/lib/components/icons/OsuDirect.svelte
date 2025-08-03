<script lang="ts">
const { beatmapsetId } = $props();

const openViaDirect = () => {
    const url = `osu://b/${beatmapsetId}`;
    console.log(url);
    window.open(url);
};
</script>

<div>
  <button aria-label="Open via osu!direct" onclick={() => openViaDirect()}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
      ><path
        fill="currentColor"
        d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
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
    background-color: var(--ctp-macchiato-pink);
  }
</style>
