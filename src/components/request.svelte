<script lang="ts">
    import type {ReceivedRequestResponse} from "../api/gen";
    import Beatmap from "./beatmap.svelte";
    let { data } = $props();
    let request: ReceivedRequestResponse = data;
</script>

<div class="request">
    <p>Request from {request.from.username}</p>
    <Beatmap data={request.beatmap}></Beatmap>
</div>

<style lang="scss">
  @use "sass:color";
  .request {
    background-color: var(--ctp-macchiato-crust);
    border-color: var(--ctp-macchiato-mantle);
    border-style: solid;
    border-width: 3px;
    border-radius: 20px;
    min-width: min-content;
    max-width: 450px;
    content-visibility: auto;
  }
  .request:hover {
    border-color: var(--ctp-macchiato-overlay0);
  }
  p {
    padding-left: 20px;
  }
</style>