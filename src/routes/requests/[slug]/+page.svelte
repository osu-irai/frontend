<script lang="ts">
    import Request from "$components/Request/Request.svelte";
    import type {
        GetRequestsResponse,
        GetUserResponse,
    } from "$types/responses.ts";
    const { data } = $props();
    const user: GetUserResponse = data.user!;
    const requests: GetRequestsResponse[] = data.requests!;
</script>

<div class="box">
    <p>{user.user.username} has {user?.requestCount} requests</p>
    <div class="grid">
        {#each requests as request (request.id)}
            <Request data={request}></Request>
        {/each}
    </div>
</div>

<style lang="scss">
    .box p {
        text-align: center;
    }
    .grid {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fill, max(20vw, 350px));
        gap: 20px;
    }
</style>
