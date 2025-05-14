<script lang="ts">
  import NavbarButton from "./navbarButton.svelte";
  import { isAuthenticated } from "../routes/CookieStore.svelte";
</script>

<nav>
  <NavbarButton text="Home" destination="/"></NavbarButton>
  {#if isAuthenticated()}
    <NavbarButton text="Sign out" destination="/api/oauth/signout"
    ></NavbarButton>
  {:else}
    <NavbarButton text="Sign in" destination="/api/oauth/auth"></NavbarButton>
  {/if}
  <NavbarButton text="Your requests" destination="/requests"></NavbarButton>
</nav>

<style lang="scss">
  nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-basis: content;
  }
</style>
