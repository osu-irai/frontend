import { type Cookies, error, redirect } from "@sveltejs/kit";
import { getRequest, getUserData } from "$api/requests.ts";
import type { Token } from "$components/Stores/CookieStore.svelte.ts";
import { getUser } from "$components/Stores/UserStore.svelte";
import type { RouteParams } from "$app/types";
export async function load({
    cookies,
    params,
}: {
    cookies: Cookies;
    params: RouteParams<"/requests/[slug]">;
}) {
    const slug = params.slug as unknown as number;
    const osuToken = cookies.get("iraiLogin");
    if (osuToken === undefined) {
        error(401, "Cannot open this page without being logged in, sorry!");
    }
    const requests = await getRequest(osuToken as Token, {
        playerId: slug,
    });
    const user = await getUserData(
        {
            playerId: slug,
        },
        osuToken as Token,
    );
    console.log(user);
    return {
        user: user.isOk() ? user.value : null,
        requests: requests.isOk() ? requests.value : null,
    };
}
