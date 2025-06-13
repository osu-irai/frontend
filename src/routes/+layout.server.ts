import type { Cookies } from "@sveltejs/kit";
import type { GetSelfUserRequestResponse } from "../api/gen";
export async function load({ cookies }: { cookies: Cookies }) {
  const headers = new Headers();
  const osuToken = cookies.get("osuToken");
  headers.append("Cookie", `osuToken=${osuToken}`);
  const data: Response = await fetch("http://localhost:5077/api/users/self", {
    credentials: "include",
    method: "GET",
    headers: headers,
  });
  if (data.ok) {
    const user: GetSelfUserRequestResponse = await data.json();
    return {
      token: osuToken ?? null,
      user: user,
    };
  } else {
    return {
      token: null,
      user: null,
    };
  }
}
