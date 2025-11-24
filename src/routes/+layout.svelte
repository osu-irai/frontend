<script lang="ts">
    import "../app.css";
    import Navbar from "$components/Navbar/Navbar.svelte";
    import { setToken } from "$components/Stores/CookieStore.svelte";
    import { setUser } from "$components/Stores/UserStore.svelte.ts";
    import Footer from "$components/Footer/Footer.svelte";
    import Toast from "$components/Toasts/Toast.svelte";
    import type {
        GetRequestsResponse,
        GetUserResponse,
    } from "$types/responses.js";
    import { onDestroy, onMount } from "svelte";
    import { notificationStore } from "$components/Stores/SignalrStore.svelte.js";
    let { data, children } = $props();

    let user: GetUserResponse | null = null;

    if (data.token !== null) {
        setToken(data.token);
        user = setUser(data.user);
    }

    onMount(async () => {
        if (user != null) {
            let uid = user.user.id;

            await notificationStore.connect(uid);
        }
    });

    onDestroy(async () => {
        await notificationStore.disconnect();
    });
</script>

<Navbar />
{@render children()}
<Toast />
<Footer />

<style>
    @import url("https://unpkg.com/@catppuccin/palette/css/catppuccin.css");
    @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");
    :global(html) {
        background: var(--ctp-macchiato-base);
        color: var(--ctp-macchiato-text);
        font-family: "Quicksand", serif;
        font-weight: 500;
        --default-size: 1.2rem;
        font-size: var(--default-size);
    }

    :global(a) {
        color: var(--ctp-macchiato-blue);
    }
</style>
