import type { Cookies } from "@sveltejs/kit";
import type { Result } from "neverthrow";
import { type GetUserResponse } from "$types/responses.ts";
import { type Token } from "$components/Stores/CookieStore.svelte.ts";
import { type FetchErrors, getSelfData } from "$api/requests.ts";
export async function load({
    cookies,
}: {
    cookies: Cookies;
}): Promise<{ token: Token | null }> {
    const osuToken = cookies.get("iraiLogin");
    if (osuToken === undefined) {
        return {
            token: null,
        };
    }
    return {
        token: osuToken as Token,
    };
}
