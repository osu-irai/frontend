<script module lang="ts">
    import { type GetRequestsResponse } from "$types/responses";
    import { getSource } from "$utils/links";

    export { request_embed };
</script>

{#snippet request_embed(request: GetRequestsResponse)}
    <div class="notification-base">
        <div class="user">Request from {request.from.username}</div>
        <div
            class="beatmap-card"
            style="background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url({getSource(
                request.beatmap.beatmapsetId,
            )});"
        >
            <div class="beatmap">
                <p style="font-weight: 600; font-size: 0.8rem;">
                    {request.beatmap.artist}
                </p>
                <span style="font-weight: 600; font-size: 1rem;">
                    {request.beatmap.title}
                </span>
            </div>
        </div>
    </div>
{/snippet}

<style>
    .notification-base {
        height: 150px;
        max-width: 300px;
    }
    .user {
        margin-bottom: 10px;
    }
    .beatmap-card {
        background-color: #1e2030;
        height: 80%;
        width: 90%;
        padding: 0 10px;
        background-size: contain;
        background-position: center;
        text-align: center;
        border: 2px solid #b7bdf8;
        background-repeat: no-repeat;
        backdrop-filter: blur(10px);
    }
</style>
