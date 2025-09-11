import { type Cookies, error, redirect } from "@sveltejs/kit";
import { getSelfRequests } from "../../../lib/api/requests.ts";
import type { Token } from "../../../lib/components/Stores/CookieStore.svelte.ts";
export async function load({ cookies }: { cookies: Cookies }) {
  const osuToken = cookies.get("osuToken");
  if (osuToken === undefined) {
    error(401, "Cannot open this page without being logged in, sorry!");
  }
  const requests = await getSelfRequests(osuToken as Token);
  return {
    requests: requests.isOk() ? requests.value : null,
  };
}
