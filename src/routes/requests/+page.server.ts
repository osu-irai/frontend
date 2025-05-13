import type {GetApiRequestsSelfResponses} from "../../api/gen/index.ts";

export async function load( { cookies } ) {
    const headers = new Headers();
    const osuToken = cookies.get("osuToken");
    headers.append("Cookie", `osuToken=${osuToken}`)
    const data = await fetch("http://localhost:5077/api/requests/self", {
        credentials: "include",
        method: "GET",
        headers: headers
    });
    const redata: GetApiRequestsSelfResponses = await data.json();
    return {
        data: redata
    };
}
