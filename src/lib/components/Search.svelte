<script lang="ts">
    import { getSearch } from "../../api/gen/requests";
    import type { GetSearchResponse } from "../../api/gen/types/responses";
    import {
        getToken,
        type Token,
    } from "$lib/components/Stores/CookieStore.svelte.ts";
    import type { Result } from "neverthrow";

    const tok: Result<Token, null> = getToken();
    const init: GetSearchResponse = {
        players: [],
        count: 0,
    };
    var search: GetSearchResponse = $state(init);
    const text: HTMLTextAreaElement = document.getElementById(
        "search",
    ) as HTMLTextAreaElement;

    async function updateSearch() {
        if (text == document.activeElement) {
            console.log("focused");
            search = { players: [], count: 0 };
            return;
        } else {
            console.log("focused on ", document.activeElement);
        }
        if (text === null || text.value == "") {
            search = { players: [], count: 0 };
            return;
        }
        if (tok.isErr()) {
            return;
        }
        const searchResult = await getSearch(tok.value, text.value);
        if (searchResult.isErr()) {
            return;
        }
        search = searchResult.value;
    }
</script>

<div>
    <p>Search</p>
    <textarea id="search" oninput={async (_) => await updateSearch()}
        >What</textarea
    >
    {#each search.players as s}
        <p>{s.username}</p>
    {/each}
</div>
