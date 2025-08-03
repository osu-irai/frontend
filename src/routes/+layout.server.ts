import type { Cookies } from "@sveltejs/kit";
import type { GetUserSelfResponse } from "../api/gen/types/responses.ts";
import { type FetchErrors, getSelfData } from "../api/gen/requests.ts";
import { type Token } from "$components/Stores/CookieStore.svelte.ts";
import type { Result } from "neverthrow";
export async function load({ cookies }: { cookies: Cookies }) {
    const osuToken = cookies.get("osuToken");
    if (osuToken === undefined) {
        return {
            token: null,
            user: null,
        };
    }
    const self: Result<GetUserSelfResponse, FetchErrors> = await getSelfData(
        osuToken as Token,
    );
    if (self.isErr()) {
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
