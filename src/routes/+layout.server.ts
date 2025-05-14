import { Cookies } from "@sveltejs/kit";
export async function load({ cookies }: { cookies: Cookies }) {
  const headers = new Headers();
  const osuToken = cookies.get("osuToken");
  return {
    token: osuToken ?? null,
  };
}
