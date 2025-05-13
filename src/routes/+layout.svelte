<script lang="ts">
	import '../app.css';
  import Navbar from '../components/Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />

{@render children()}

<style>
    html {
        background-color: var(--ctp-macchiato-base);
    }
</style>
