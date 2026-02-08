<script lang="ts">
    import NavbarButton from "./NavbarButton.svelte";
    import { isAuthenticated } from "$components/Stores/CookieStore.svelte";
    import NavbarHomeButton from "./NavbarHomeButton.svelte";
    import { PUBLIC_IRAI_API } from "$env/static/public";
    const api = `${PUBLIC_IRAI_API}oauth/auth`;
</script>

<!--
@component
Navigation bar. Always displayed at the top
-->
<nav id="navigation">
    <NavbarButton text="Home" destination="/"></NavbarButton>
    <NavbarButton text="Create a request!" destination="/requests/create" />
    {#if isAuthenticated()}
        <NavbarHomeButton />
    {:else}
        <NavbarButton text="Sign in" destination={api} />
    {/if}
</nav>

<style lang="scss">
    #navigation {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        align-content: flex-start;
        padding: 20px 0;
        width: 100%;
    }
</style>
