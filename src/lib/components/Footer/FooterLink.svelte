<script lang="ts">
    const { string, link } = $props();
</script>

<!--
@component
Footer link
-->
<a href={link}>{string}</a>

<style>
    a {
        color: var(--ctp-macchiato-text);
        padding: 0 20px;
        position: relative;
    }
</style>
