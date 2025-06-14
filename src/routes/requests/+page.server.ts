import type {
  GetApiRequestsSelfResponse,
  GetApiRequestsSelfResponses,
  ReceivedRequestResponse,
} from "../../api/gen/index.ts";
import type { Cookies } from "@sveltejs/kit";
import { getSelfRequests } from "../../api/gen/requests.ts";
import type { Token } from "$components/Stores/CookieStore.svelte.ts";
export async function load({ cookies }: { cookies: Cookies }) {
  const osuToken = cookies.get("osuToken");
  if (osuToken === undefined) {
    return {
      requests: null,
    };
  }
  const requests = await getSelfRequests(osuToken as Token);
  return {
    requests: requests.isOk() ? requests.value : requests.error,
  };
}
