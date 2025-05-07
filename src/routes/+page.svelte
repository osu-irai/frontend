<script lang="ts">
    let token = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if token.data.token != null}
    <p>Hello, user</p>
{:else}
    <p>Who?</p>
{/if}