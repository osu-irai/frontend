<script lang="ts">
    import type {GetApiRequestsSelfResponse} from "../../api/gen";
    import Request from "../../components/request.svelte";
    const data = $props();
    const inner: [GetApiRequestsSelfResponse] = data.data.data;
</script>

<p>Your requests</p>
{#each inner as request (request.id)}
    <Request data={request}></Request>
{/each}