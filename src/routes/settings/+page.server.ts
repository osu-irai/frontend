import { error, type Cookies, type RequestHandler } from "@sveltejs/kit";
import type { Token } from "$components/Stores/CookieStore.svelte.ts";
import {
    getSelfSettings,
    getSelfTwitchUsername,
    setSettings,
} from "$api/requests.ts";
import type { SettingsDTO } from "$types/common.js";

export const actions = {
    updateSettings: async ({
        cookies,
        request,
    }: {
        cookies: Cookies;
        request: Request;
    }) => {
        const osuToken = cookies.get("iraiLogin") as Token | undefined;
        if (osuToken === undefined) {
            error(401, "You're not supposed to be here");
        }

        const data = await request.formData();

        const enableIrc = data.get("irc");
        const enableTwitch = data.get("twitch");

        const irc: boolean = booleanFromForm(enableIrc);
        const twitch = booleanFromForm(enableTwitch);
        await setSettings(osuToken, { enableIrc: irc, enableTwitch: twitch });
    },
};

function booleanFromForm(value: FormDataEntryValue | null): boolean {
    return value == "on" ? true : false;
}
export async function load({ cookies }: { cookies: Cookies }) {
    const osuToken = cookies.get("iraiLogin");
    if (osuToken === undefined) {
        error(401, "Cannot open this page without being logged in, sorry!");
    }
    const settings = await getSelfSettings(osuToken as Token);
    const username = await getSelfTwitchUsername(osuToken as Token);
    if (settings.isOk() && username.isOk()) {
        if (settings.value !== null) {
            return {
                settings: settings.value as SettingsDTO,
                twitch_username: username.value as string,
            };
        }
        return {
            settings: null,
        };
    }
}
