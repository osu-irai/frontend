<script lang="ts">
    import RequestForm from "$components/Request/RequestForm.svelte";
    const { data } = $props();
</script>

<div class="base">
    <RequestForm />
</div>

<style lang="scss">
    .base {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
