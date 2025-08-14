<script lang="ts">
    import { getToken, type Token } from "./Stores/CookieStore.svelte";
    import { parseFormData, type CreateRequestData } from "./RequestForm";
    import type { Result } from "neverthrow";
    import type { ParseError } from "$lib/types/errors";
    import type { SearchResult } from "$lib/types/responses";
    import { getSearch } from "../../api/gen/requests";
    import type { GetSearchResponse } from "$types/responses";
    const cookie = getToken();
    function makeRequest(
        event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
    ) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const parsedData: Result<CreateRequestData, ParseError> =
            parseFormData(data);
        if (parsedData.isOk()) {
            const inner = parsedData.value;
            let headers = new Headers();
            headers.append("Cookie", `osuToken=${cookie}`);
            fetch(
                `http://localhost:5077/api/requests/self?beatmapId=${inner.beatmap}&destinationId=${inner.player}`,
                {
                    credentials: "include",
                    method: "POST",
                    headers: headers,
                },
            );
        }
    }
    const tok: Result<Token, null> = getToken();
    const init: GetSearchResponse = {
        players: [],
        count: 0,
    };
    var search: GetSearchResponse = $state(init);

    async function updateSearch() {
        const text: HTMLTextAreaElement = document.getElementById(
            "search",
        ) as HTMLTextAreaElement;
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

    function setUsername(val: string) {
        const text: HTMLTextAreaElement = document.getElementById(
            "search",
        ) as HTMLTextAreaElement;
        search = { players: [], count: 0 };
        text.value = val;
    }
</script>

<h1>Create a request!</h1>

<div>
    <form method="POST" onsubmit={makeRequest}>
        <label>
            <input
                oninput={async (_) => {
                    await updateSearch();
                }}
                name="destination"
                type="text"
                id="search"
                required
            />
            Player
        </label>
        <label>
            <input
                name="beatmap"
                type="text"
                required
                pattern="(?:https:\/\/osu\.ppy\.sh\/beatmapsets\/\d+#[a-z]*\/)?(\d+)(?:\/.*)?"
            />
            Beatmap
        </label>
        <button type="submit">Submit</button>
    </form>
    {#each search.players as player}
        <button class="completion" onclick={(_) => setUsername(player.username)}
            >{player.username}</button
        >
    {/each}
</div>

<style lang="scss">
    @use "sass:color";
    form {
        display: flex;
        flex-direction: column;
    }
    form input,
    form button {
        margin: 5px;
        appearance: none;
        color: inherit;
        font-family: inherit;
        background-color: var(--ctp-macchiato-mantle);
        border: none;
        outline: 2px solid var(--ctp-macchiato-overlay0);
    }
    form button {
        max-width: 25%;
    }
    .completion {
        margin-top: 20px;
        width: 100%;
        appearance: none;
        color: inherit;
        font-family: inherit;
        background-color: var(--ctp-macchiato-mantle);
        border: none;
        outline: 1px solid var(--ctp-macchiato-overlay0);
    }
    .completion:hover {
        outline: 1px solid var(--ctp-macchiato-green);
    }
    input:user-valid {
        outline: none;
        appearance: none;
        border-color: none;
        outline: 2px solid var(--ctp-macchiato-green);
    }
    input:user-invalid {
        outline: none;
        appearance: none;
        border-color: none;
        outline: 2px solid var(--ctp-macchiato-red);
    }
    button {
    }
</style>
