import type {
  GetApiRequestsSelfResponse,
  GetApiRequestsSelfResponses,
  ReceivedRequestResponse,
} from "../../api/gen/index.ts";
import type { Cookies } from "@sveltejs/kit";
export async function load({ cookies }: { cookies: Cookies }) {
  const headers = new Headers();
  const osuToken = cookies.get("osuToken");
  headers.append("Cookie", `osuToken=${osuToken}`);
  const data = await fetch("http://localhost:5077/api/requests/self", {
    credentials: "include",
    method: "GET",
    headers: headers,
  });
  const requests: GetApiRequestsSelfResponse = await data.json();
  return {
    requests: requests,
  };
}
