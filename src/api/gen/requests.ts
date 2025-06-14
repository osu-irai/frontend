import type { Token } from "$components/Stores/CookieStore.svelte";
import { err, ok, Result } from "neverthrow";
import type { GetApiRequestsSelfResponse, SelfUserResponse } from "./types.gen";

export async function getSelfData(
  token: Token,
): Promise<Result<SelfUserResponse, null>> {
  const headers = new Headers();
  headers.append("Cookie", `osuToken=${token}`);
  const data: Response = await fetch(
    "http://localhost:5077/api/users/self",
    {
      credentials: "include",
      method: "GET",
      headers: headers,
    },
  );
  if (data.ok) {
    return ok(await data.json());
  } else {
    return err(null);
  }
}

export async function getSelfRequests(
  token: Token,
): Promise<Result<GetApiRequestsSelfResponse, null>> {
  const headers = new Headers();
  headers.append("Cookie", `osuToken=${token}`);
  const data = await fetch("http://localhost:5077/api/requests/self", {
    credentials: "include",
    method: "GET",
    headers: headers,
  });
  const requests: GetApiRequestsSelfResponse = await data.json();
  return ok(requests);
}
