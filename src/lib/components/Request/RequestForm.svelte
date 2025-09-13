<script lang="ts">
    import {
        getToken,
        type Token,
    } from "$components/Stores/CookieStore.svelte";
    import type { Result } from "neverthrow";
    import type {
        GetBeatmapQueryResponse,
        GetPlayerQueryResponse,
    } from "$types/responses";
    import {
        getSearchBeatmap,
        getSearchPlayer,
        postNamedSelfRequest,
    } from "$lib/api/requests.ts";
    import BeatmapCompletion from "./Completion/BeatmapCompletion.svelte";
    import UserCompletion from "./Completion/UserCompletion.svelte";
    import { parseFormData } from "./RequestForm.ts";
    let abortController: AbortController | null = null;
    let searchTimeout: NodeJS.Timeout | null;

    const tok: Result<Token, null> = getToken();
    function makeRequest(
        event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
    ) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (tok.isErr()) {
            return;
        }
        const parsedData = parseFormData(data);
        console.log(parsedData);
        if (parsedData.isOk()) {
            const inner = parsedData.value;

            postNamedSelfRequest(tok.value, inner);
        }
    }
    const init: GetPlayerQueryResponse = {
        players: [],
        count: 0,
    };
    var search: GetPlayerQueryResponse = $state(init);
    var beatmap_search: GetBeatmapQueryResponse = $state({
        beatmaps: [],
        count: 0,
    });

    async function updateBeatmaps() {
        const text: HTMLTextAreaElement = document.getElementById(
            "beatmap",
        ) as HTMLTextAreaElement;
        if (text === null || text.value == "") {
            beatmap_search = { beatmaps: [], count: 0 };
            return;
        }
        if (tok.isErr()) {
            return;
        }

        if (searchTimeout) {
            clearTimeout(searchTimeout);
            searchTimeout = null;
        }

        if (abortController) {
            abortController.abort();
            abortController = null;
        }

        searchTimeout = setTimeout(async () => {
            try {
                abortController = new AbortController();
                const searchResult = await getSearchBeatmap(
                    tok.value,
                    text.value,
                );
                if (searchResult.isErr()) {
                    return;
                }
                beatmap_search = searchResult.value;
            } catch (error) {
            } finally {
                abortController = null;
                searchTimeout = null;
            }
        }, 500);
    }

    async function updatePlayers() {
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
        const searchResult = await getSearchPlayer(tok.value, text.value);
        if (searchResult.isErr()) {
            return;
        }
        search = searchResult.value;
    }

    function setUsername(id: string) {
        const text: HTMLTextAreaElement = document.getElementById(
            "search",
        ) as HTMLTextAreaElement;
        search = { players: [], count: 0 };
        text.value = id;
    }

    function setBeatmap(id: number) {
        const text: HTMLTextAreaElement = document.getElementById(
            "beatmap",
        ) as HTMLTextAreaElement;
        beatmap_search = { beatmaps: [], count: 0 };
        text.value = id.toString();
    }
</script>

<h1>Create a request!</h1>

<div>
    <form method="POST" onsubmit={makeRequest}>
        <label>
            <input
                oninput={async (_) => {
                    await updatePlayers();
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
                oninput={async (_) => {
                    await updateBeatmaps();
                }}
                name="beatmap"
                type="text"
                id="beatmap"
                required
            />
            Beatmap
        </label>
        <button type="submit">Submit</button>
    </form>
    <div class="completion_block">
        {#each search.players as player}
            <UserCompletion user={player} click={setUsername} />
        {/each}
        {#each beatmap_search.beatmaps as map}
            <BeatmapCompletion beatmap={map} click={setBeatmap} />
        {/each}
    </div>
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
    form button:hover {
        outline: 2px solid var(--ctp-macchiato-green);
    }
    form button:active {
        outline: 2px solid var(--ctp-macchiato-blue);
    }
    .completion_block {
        width: 200px;
        display: flex;
        flex-direction: column;
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
</style>
