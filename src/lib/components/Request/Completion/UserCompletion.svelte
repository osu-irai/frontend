<script lang="ts">
    import type { BeatmapDTO, UserDTO } from "$types/common.ts";
    let { user, click }: { user: UserDTO; click: (id: string) => void } =
        $props();
    let source = () => user.avatarUrl.toString();
</script>

<button onclick={(_) => click(user.username)}>
    <img src={source()} loading="lazy" alt="pfp of user {user.username}" />
    <div class="text">
        <p>{user.username}</p>
    </div>
</button>

<style lang="scss">
    @use "sass:color";
    .text {
        margin-left: 5px;
        margin-right: 5px;
        padding: 5px;
        position: relative;
    }
    .text p {
        white-space: nowrap;
        overflow: hidden;
    }
    img {
        height: 100%;
        filter: brightness(30%);
    }
    button {
        padding: 0;
        margin: 5px;
        width: 200px;
        height: 50px;
        appearance: none;
        display: flex;
        flex-direction: row;
        position: relative;
        color: inherit;
        font-family: inherit;
        background-color: var(--ctp-macchiato-mantle);
        border: none;
        outline: 2px solid var(--ctp-macchiato-overlay0);
    }
    button:hover {
        outline: 2px solid var(--ctp-macchiato-green);
    }
    button:active {
        outline: 2px solid var(--ctp-macchiato-blue);
    }
</style>
