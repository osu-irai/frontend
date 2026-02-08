<script>
    import SettingsMenu from "$components/Menus/SettingsMenu.svelte";

    const { data } = $props();
</script>

<div class="parent">
    <h1>You need some initial setup!</h1>
    <SettingsMenu {data} />
</div>

<style>
    .parent {
        margin: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    h1 {
        margin: 0;
        flex-shrink: 0;
        padding: 20px 0;
        text-align: center;
    }
</style>
