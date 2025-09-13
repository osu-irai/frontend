import type { Cookies } from "@sveltejs/kit";
import type { Result } from "neverthrow";
import { type GetUserSelfResponse } from "$types/responses.ts";
import { type Token } from "$components/Stores/CookieStore.svelte.ts";
import { type FetchErrors, getSelfData } from "$api/requests.ts";
export async function load({ cookies, url }: { cookies: Cookies; url: URL }) {
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
