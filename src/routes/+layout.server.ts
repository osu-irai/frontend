import type { Cookies } from "@sveltejs/kit";
import type { SelfUserResponse } from "../api/gen";
import { getSelfData } from "../api/gen/requests";
import type { Token } from "$components/Stores/CookieStore.svelte";
import type { Result } from "neverthrow";
export async function load({ cookies }: { cookies: Cookies }) {
  const osuToken = cookies.get("osuToken");
  if (osuToken === undefined) {
    return {
      token: null,
      user: null,
    };
  }
  const self: Result<SelfUserResponse, null> = await getSelfData(
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
