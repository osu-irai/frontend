<script lang="ts">
  import "../app.css";
  import Navbar from "$components/Navbar/Navbar.svelte";
  import { setToken } from "$components/Stores/CookieStore.svelte";
  import { setUser } from "$components/Stores/UserStore.svelte.js";

  let { data, children } = $props();
  setToken(data.token);
  if (data.token !== null) {
    setUser(data.user);
  }
</script>

<Navbar />

{@render children()}

<style>
  html {
    background-color: var(--ctp-macchiato-base);
  }
</style>
