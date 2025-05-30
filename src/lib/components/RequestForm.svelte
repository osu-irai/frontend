<script lang="ts">
  import { getToken } from "./Stores/CookieStore.svelte";
  import { parseFormData } from "./RequestForm";
  const cookie = getToken();
  function makeRequest(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [destinationId, beatmapId] = parseFormData(data);
    let headers = new Headers();
    headers.append("Cookie", `osuToken=${cookie}`);
    fetch(
      `http://localhost:5077/api/requests/self?beatmapId=${beatmapId}&destinationId=${destinationId}`,
      {
        credentials: "include",
        method: "POST",
        headers: headers,
      },
    );
  }
</script>

<h1>Create a request!</h1>

<form method="POST" onsubmit={makeRequest}>
  <label>
    <input
      name="destination"
      type="text"
      required
      pattern="(?:https:\/\/osu\.ppy\.sh\/users\/)?\d*(?:\/*)"
    />
    Player
  </label>
  <label>
    <input
      name="beatmap"
      type="text"
      required
      pattern="(?:https:\/\/osu.ppy.sh\/beatmapsets\/\d*.*\/)?\d*"
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
  textarea {
    appearance: none;
  }
  textarea:hover {
    appearance: none;
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
