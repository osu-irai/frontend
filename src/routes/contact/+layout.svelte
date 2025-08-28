<script lang="ts">
    import "../../app.css";
    import Navbar from "$components/Navbar/Navbar.svelte";

    let { children } = $props();
</script>

{@render children()}

<style>
</style>
