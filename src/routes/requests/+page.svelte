<script lang="ts">
  import Request from "$components/request.svelte";
  import type { GetApiRequestsSelfResponse } from "../../api/gen/types.gen.js";
  const { data } = $props();
  const requests: GetApiRequestsSelfResponse = data.requests;
</script>

<p>Your requests</p>
{#each requests as request (request.id)}
  <Request data={request}></Request>
{/each}
