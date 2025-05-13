<script lang="ts">
    import NavbarButton from "./navbarButton.svelte";
    let data = $props();
    console.log("navbar:", data);
</script>

<nav>
    <NavbarButton text="Home" destination="/"></NavbarButton>
    {#if null === null}
        <NavbarButton text="Sign in" destination="/api/oauth/auth"></NavbarButton>
    {:else}
        <NavbarButton text="Sign out" destination="/api/oauth/signout"></NavbarButton>
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
