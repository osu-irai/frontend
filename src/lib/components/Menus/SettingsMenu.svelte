<script lang="ts">
    import { getSelfSettings } from "$api/requests";
    import { enhance } from "$app/forms";
    import type { SettingsDTO } from "$types/common";

    const {
        data,
    }: { data: { settings: SettingsDTO | null; twitch_username: string } } =
        $props();
    let irc = data.settings?.enableIrc ?? false;
    let twitch = data.settings?.enableTwitch ?? false;
</script>

<form method="POST" class="settings" use:enhance>
    <div class="toggles">
        <label class="switch">
            <input type="checkbox" name="irc" checked={irc} />
            Enable IRC notifications (real-time notifications via osu! chat)
        </label>
        {#if data.twitch_username !== ""}
            <div class="twitch-box">
                <svg
                    width="64px"
                    height="64px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g><g id="SVGRepo_iconCarrier">
                        <path
                            fill="#ffffff"
                            d="M13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z"
                            style="--darkreader-inline-fill: var(--darkreader-background-ffffff, #24273a);"
                            data-darkreader-inline-fill=""
                        ></path>
                        <g
                            fill="#9146FF"
                            style="--darkreader-inline-fill: var(--darkreader-background-9146ff, #4600ae);"
                            data-darkreader-inline-fill=""
                        >
                            <path
                                d="M4.5 1L2 3.5v9h3V15l2.5-2.5h2L14 8V1H4.5zM13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z"
                            ></path>
                            <path d="M11.5 3.75h-1v3h1v-3zM8.75 3.75h-1v3h1v-3z"
                            ></path>
                        </g>
                    </g></svg
                >
                <p>Logged in as {data.twitch_username}</p>
            </div>
            <label class="switch">
                <input type="checkbox" name="twitch" checked={twitch} />
                Enable Twitch integration
            </label>
        {/if}
    </div>
    <button formaction="?/updateSettings">Apply changes</button>
</form>

<style>
    .settings {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .twitch-box {
        display: flex;
        flex-direction: row;
    }
    .toggles {
        display: flex;
        flex-direction: column;
    }
</style>
