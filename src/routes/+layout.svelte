<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}

<style>
    html {
        background-color: var(--ctp-macchiato-base);
    }
</style>