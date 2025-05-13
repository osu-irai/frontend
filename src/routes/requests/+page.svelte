<script lang="ts">
  import type { GetApiRequestsSelfResponse } from "../../api/gen";
  import Request from "../../components/request.svelte";
  const { data }= $props();
</script>

<p>Your requests</p>
{#each data.requests as request (request.id)}
  <Request data={request} token={data.token}></Request>
{/each}
