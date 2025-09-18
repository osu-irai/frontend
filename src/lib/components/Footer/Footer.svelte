<script lang="ts">
    import FooterLink from "./FooterLink.svelte";
</script>

<!--
@component
Footer block with basic misc links
-->
<div class="footer">
    <FooterLink string="about" link="/about" />
    <FooterLink string="contact" link="/contact" />
</div>

<style>
    .footer {
        position: fixed;
        text-align: center;
        line-height: 40px;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 40px;
        left: 0px;
        bottom: 0px;
        background-color: var(--ctp-macchiato-mantle);
    }
</style>
