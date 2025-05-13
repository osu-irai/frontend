<script lang="ts">
	import '../app.css';
  import Navbar from '../components/Navbar.svelte';

	let { data, children } = $props();
</script>

<Navbar is_signed_in={data.token == null ? false : true}/>

{@render children()}

<style>
    html {
        background-color: var(--ctp-macchiato-base);
    }
</style>
