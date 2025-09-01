import { assertEquals } from "@std/assert";
import {
    type GetRequestsQuery,
    type GetSearchQuery,
    intoQueryString,
} from "src/lib/api/types/queries.ts";

Deno.test({
    name: "GetRequestsQuery as URL params",
    fn: () => {
        const params: GetRequestsQuery = {
            playerId: 10,
        };
        assertEquals(intoQueryString(params), "playerId=10");
    },
});

Deno.test({
    name: "GetSearchQuery as URL param",
    fn: () => {
        const oneLetter: GetSearchQuery = {
            query: "C",
        };
        assertEquals(intoQueryString(oneLetter), "query=C");
        const fullUsername: GetSearchQuery = {
            query: "peppy",
        };
        assertEquals(intoQueryString(fullUsername), "query=peppy");
    },
});
