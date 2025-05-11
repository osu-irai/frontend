<script lang="ts">
    let token = $props();
</script>
{#if token.data.token != null}
    <p>Hello, user</p>
    <a href="http://localhost:5077/api/oauth/signout">Sign out</a>
    <a href="http://localhost:5077/requests">Requests</a>
{:else}
    <p>Who?</p>
    <a href="http://localhost:5077/api/oauth/auth">Sign in dummy</a>
{/if}
