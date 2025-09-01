import type { Cookies } from "@sveltejs/kit";
import { getSelfRequests } from "../../lib/api/requests.ts";
import type { Token } from "../../lib/components/Stores/CookieStore.svelte.ts";
export async function load({ cookies }: { cookies: Cookies }) {
  const osuToken = cookies.get("osuToken");
  if (osuToken === undefined) {
    return {
      requests: null,
    };
  }
  const requests = await getSelfRequests(osuToken as Token);
  return {
    requests: requests.isOk() ? requests.value : null,
  };
}
