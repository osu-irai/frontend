import { Cookies } from "@sveltejs/kit";
export function load( { cookies }: { cookies: Cookies } ) {
    let cookie = cookies.get("osuToken");
    console.log(cookie);
    return {
        token: cookie ?? null
    };
}
