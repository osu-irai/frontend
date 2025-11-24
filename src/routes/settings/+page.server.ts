import { error, type Cookies, type RequestHandler } from "@sveltejs/kit";
import type { Token } from "$components/Stores/CookieStore.svelte.ts";
import { getSelfSettings, setSettings } from "$api/requests.ts";
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

        let irc: boolean = false;
        if (enableIrc == "on") {
            irc = true;
        }
        if (enableIrc == null) {
            irc = false;
        }
        console.log(`irc = ${irc}`);
        await setSettings(osuToken, { enableIrc: irc });
    },
};

export async function load({ cookies }: { cookies: Cookies }) {
    const osuToken = cookies.get("iraiLogin");
    if (osuToken === undefined) {
        error(401, "Cannot open this page without being logged in, sorry!");
    }
    const settings = await getSelfSettings(osuToken as Token);
    if (settings.isOk()) {
        console.log(settings.value);
        if (settings.value !== null) {
            return {
                settings: settings.value as SettingsDTO,
            };
        }
        return {
            settings: null,
        };
    }
}
