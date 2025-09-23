import type { Cookies } from "@sveltejs/kit";
import type { Result } from "neverthrow";
import { type GetUserResponse } from "$types/responses.ts";
import { type Token } from "$components/Stores/CookieStore.svelte.ts";
import { type FetchErrors, getSelfData } from "$api/requests.ts";
export async function load({ cookies }: { cookies: Cookies }) {
    const osuToken = cookies.get("iraiLogin");
    if (osuToken === undefined) {
        return {
            token: null,
            user: null,
        };
    }
    const self: Result<GetUserResponse, FetchErrors> = await getSelfData(
        osuToken as Token,
    );
    if (self.isErr()) {
        console.log(self.error);
        return {
            token: null,
            user: null,
        };
    } else {
        return {
            token: osuToken,
            user: self.value,
        };
    }
}
