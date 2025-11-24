<script>
    import SettingsMenu from "$components/Menus/SettingsMenu.svelte";

    const { data } = $props();
    console.log(data);
</script>

<h1>You need some initial setup!</h1>

<SettingsMenu {data} />
