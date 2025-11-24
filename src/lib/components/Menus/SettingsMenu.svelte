<script lang="ts">
    import { getSelfSettings } from "$api/requests";
    import { enhance } from "$app/forms";
    import type { SettingsDTO } from "$types/common";

    const { data }: { data: { settings: SettingsDTO | null } } = $props();
    let irc = data.settings?.enableIrc ?? false;
</script>

<form method="POST" use:enhance>
    <label class="switch">
        <input type="checkbox" name="irc" checked={irc} />
        Enable IRC notifications (real-time notifications via osu! chat)
    </label>
    <button formaction="?/updateSettings">Apply changes</button>
</form>
