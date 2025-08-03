<script lang="ts">
    import { getSearch } from "../../api/gen/requests";
    import type { GetSearchResponse } from "../../api/gen/types/responses";
    import { getToken } from "./Stores/CookieStore.svelte";

    const init: GetSearchResponse = {
        players: [],
        count: 0,
    };
    var search: GetSearchResponse = $state(init);

    async function updateSearch() {
        const text: HTMLTextAreaElement = document.getElementById(
            "search",
        )! as HTMLTextAreaElement;
        const tok = getToken();
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
    ></textarea>
    {#each search.players as s}
        <p>{s}</p>
    {/each}
</div>
