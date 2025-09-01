<script lang="ts">
    import "../app.css";
    import Navbar from "$components/Navbar/Navbar.svelte";
    import { setToken } from "$components/Stores/CookieStore.svelte";
    import { setUser } from "$components/Stores/UserStore.svelte.js";

    let { data, children } = $props();
    if (data.token !== null) {
        setToken(data.token);
        setUser(data.user);
    }
</script>

<Navbar />
{@render children()}

<style>
</style>
