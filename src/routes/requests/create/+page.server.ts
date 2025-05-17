// import { Actions, Cookies } from "@sveltejs/kit";

// export function load({ cookies }) {
//   // ...
// }

// export const actions = {
//   default: async (
//     { cookies, request }: { cookies: Cookies; request: Request },
//   ) => {
//     const cookie = cookies.get("osuToken");
//     const data = await request.formData();
//     const destinationId = data.get("destination");
//     const beatmapId = data.get("beatmap");
//     let headers = new Headers();
//     headers.append("Cookie", `osuToken=${cookie}`);
//     fetch(
//       `http://localhost:5077/api/requests/self?beatmapId=${beatmapId}&destinationId=${destinationId}`,
//       {
//         credentials: "include",
//         method: "POST",
//         headers: headers,
//       },
//     );
//   },
// } satisfies Actions;
