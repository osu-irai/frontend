import type { Cookies } from "@sveltejs/kit";
import type { Result } from "neverthrow";
import { type GetUserSelfResponse } from "../lib/api/types/responses.ts";
import { type Token } from "../lib/components/Stores/CookieStore.svelte.ts";
import { type FetchErrors, getSelfData } from "../lib/api/requests.ts";
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
