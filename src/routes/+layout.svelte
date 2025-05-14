<script lang="ts">
  import "../app.css";
  import Navbar from "../components/Navbar.svelte";
  import { setToken } from "./CookieStore.svelte";

  let { data, children } = $props();
  setToken(data.token);
</script>

<Navbar />

{@render children()}

<style>
  html {
    background-color: var(--ctp-macchiato-base);
  }
</style>
