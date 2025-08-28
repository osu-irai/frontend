<script lang="ts">
    import "../../app.css";
    import Navbar from "$components/Navbar/Navbar.svelte";
    import { setToken } from "$components/Stores/CookieStore.svelte";
    import { setUser } from "$components/Stores/UserStore.svelte.js";

    let { children } = $props();
</script>

{@render children()}

<style>
</style>
