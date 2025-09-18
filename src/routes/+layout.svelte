<script lang="ts">
    import "../app.css";
    import Navbar from "$components/Navbar/Navbar.svelte";
    import { setToken } from "$components/Stores/CookieStore.svelte";
    import { setUser } from "$components/Stores/UserStore.svelte.ts";
    import Footer from "$components/Footer/Footer.svelte";
    import Toast from "$components/Toasts/Toast.svelte";
    import { toasts } from "$components/Toasts/ToastStore.svelte.ts";
    let { data, children } = $props();
    if (data.token !== null) {
        setToken(data.token);
        setUser(data.user);
    } else {
    }
</script>

<Navbar />
{@render children()}
<Toast />
<Footer />

<style>
</style>
