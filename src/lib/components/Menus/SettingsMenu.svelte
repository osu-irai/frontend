<script lang="ts">
    import { getSelfSettings } from "$api/requests";
    import { enhance } from "$app/forms";
    import Twitch from "$components/Icons/Twitch.svelte";
    import type { SettingsDTO } from "$types/common";

    const {
        data,
    }: { data: { settings: SettingsDTO | null; twitch_username: string } } =
        $props();
    let irc = $state(data.settings?.enableIrc ?? false);
    let twitch = $state(data.settings?.enableTwitch ?? false);
    console.log(irc, twitch);
</script>

<form
    method="POST"
    class="settings"
    use:enhance={() => {
        return async ({ update }) => {
            // Don't reset form, keep local state
            await update({ reset: false });
        };
    }}
>
    <div class="toggles">
        <label class="switch">
            <input type="checkbox" name="irc" checked={irc} />
            Enable IRC notifications (real-time notifications via osu! chat)
        </label>
        {#if data.twitch_username !== ""}
            <div class="twitch-box">
                <Twitch />
                <span>Logged in as {data.twitch_username}</span>
            </div>
            <label class="switch">
                <input type="checkbox" name="twitch" checked={twitch} />
                Enable Twitch integration
            </label>
        {/if}
    </div>
    <button formaction="?/updateSettings" id="apply-changes"
        >Apply changes</button
    >
</form>

<style lang="scss">
    .settings {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: stretch;
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
    #apply-changes {
        background-color: var(--ctp-macchiato-surface);
        color: var(--text);
        padding: 10px 20px;
        font-size: 20px;
        border: 3px solid var(--ctp-macchiato-mauve);
        justify-self: flex-end;

        transition:
            background-color 0.1s ease,
            transform 0.1s ease,
            box-shadow 0.1s ease;

        &:hover {
            background-color: var(--ctp-macchiato-mauve);
            color: var(--ctp-macchiato-base);
        }

        &:active {
            background-color: var(--ctp-macchiato-overlay1);
            color: var(--ctp-macchiato-base);
        }
    }
</style>
