<script lang="ts">
  import type { ReceivedRequestResponse } from "../api/gen";
  import Beatmap from "./beatmap.svelte";
  import Delete from "./icons/Delete.svelte";
  let { data } = $props();
  let nodeRef = $state();
  let request: ReceivedRequestResponse = data;
</script>

<div bind:this={nodeRef} class="request">
  <div class="source">
    <div class="user">
      <img
        src={request.from.avatarUrl}
        alt="Avatar of request author {request.from.username}"
      />
      <p>{request.from.username}</p>
    </div>
    <div class="button-side">
      <Delete id={request.id} {nodeRef}></Delete>
    </div>
  </div>
  <Beatmap beatmap={request.beatmap} />
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
  .source {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .user {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .button-side {
    min-width: 40px;
    width: 100%;
    max-width: 40px;
    display: hidden;
  }
  .user p {
    padding-left: 10px;
    width: max-content;
  }
  .user img {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    max-height: 32px;
    border-radius: 5px;
  }
</style>
