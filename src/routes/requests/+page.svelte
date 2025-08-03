<script lang="ts">
import Request from "$components/Request.svelte";
import type {
    GetApiRequestsSelfResponse,
    GetSelfUserRequestResponse,
} from "../../api/gen/types.gen.js";
const { data } = $props();
const requests: GetApiRequestsSelfResponse = data.requests;
const user: GetSelfUserRequestResponse | null = data.user;
</script>

<div class="box">
  <p>You have {user?.requestCount} requests</p>
  <div class="grid">
    {#each requests as request (request.id)}
      <Request data={request}></Request>
    {/each}
  </div>
</div>

<style lang="scss">
  .box {
    margin: 20px;
  }
  .box p {
    text-align: center;
  }
  .grid {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, 400px);
    gap: 20px;
  }
</style>
