<script lang="ts">
    import NavbarButton from "./NavbarButton.svelte";
    import { isAuthenticated } from "$components/Stores/CookieStore.svelte";
    import NavbarHomeButton from "./NavbarHomeButton.svelte";
    const api = `${import.meta.env.VITE_IRAI_ROOT}api/oauth/auth`;
</script>

<!--
@component
Navigation bar. Always displayed at the top
-->
<nav>
    <NavbarButton text="Home" destination="/"></NavbarButton>
    <NavbarButton text="Create a request!" destination="/requests/create" />
    {#if isAuthenticated()}
        <NavbarHomeButton />
    {:else}
        <NavbarButton text="Sign in" destination={api} />
    {/if}
</nav>

<style lang="scss">
    nav {
        height: 1.2vh;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        align-content: flex-start;
        margin: 20px 0 40px 0;
        width: 100%;
    }
</style>
