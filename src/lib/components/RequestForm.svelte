<script lang="ts">
  import { getToken } from "./Stores/CookieStore.svelte";
  import { parseFormData, type CreateRequestData } from "./RequestForm";
  import type { Result } from "neverthrow";
  import type { ParseError } from "$lib/types/errors";
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
</script>

<h1>Create a request!</h1>

<form method="POST" onsubmit={makeRequest}>
  <label>
    <input
      name="destination"
      type="text"
      required
      pattern="(?:https:\/\/osu\.ppy\.sh\/users\/)?(\d+)(?:\/.*)?"
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

<style lang="scss">
  @use "sass:color";
  form {
    display: flex;
    flex-direction: column;
  }
  input,
  button {
    margin: 5px;
    appearance: none;
    color: inherit;
    font-family: inherit;
    background-color: var(--ctp-macchiato-mantle);
    border: none;
    outline: 2px solid var(--ctp-macchiato-overlay0);
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
    max-width: 25%;
  }
</style>
