<script lang="ts">
    import { getToken, type Token } from "./Stores/CookieStore.svelte";
    import { parseFormData, type CreateRequestData } from "./RequestForm";
    import type { Result } from "neverthrow";
    import type { ParseError } from "$lib/types/errors";
    import { getSearchBeatmap, getSearchPlayer } from "../../api/gen/requests";
    import type {
        GetBeatmapQueryResponse,
        GetPlayerQueryResponse,
    } from "$types/responses";
    const cookie = getToken();

    let abortController: AbortController | null = null;
    let searchTimeout: number | null;

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

    function setUsername(val: string) {
        const text: HTMLTextAreaElement = document.getElementById(
            "search",
        ) as HTMLTextAreaElement;
        search = { players: [], count: 0 };
        text.value = val;
    }

    function setBeatmap(val: number) {
        const text: HTMLTextAreaElement = document.getElementById(
            "beatmap",
        ) as HTMLTextAreaElement;
        beatmap_search = { beatmaps: [], count: 0 };
        text.value = val.toString();
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
            <button
                class="completion"
                onclick={(_) => setUsername(player.username)}
                >{player.username}</button
            >
        {/each}
        {#each beatmap_search.beatmaps as player}
            <button
                class="completion"
                onclick={(_) => setBeatmap(player.beatmapId)}
                >{player.difficulty}</button
            >
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
    .completion_block {
        width: 200px;
        display: flex;
        flex-direction: column;
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
</style>
