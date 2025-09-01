<script lang="ts">
    import Request from "$components/Request/Request.svelte";
    import type {
        GetRequestsResponse,
        GetUserSelfResponse,
    } from "$types/responses.ts";
    const { data } = $props();
    const user: GetUserSelfResponse = data.user!;
    const requests: GetRequestsResponsep[] = data.requests!;
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
