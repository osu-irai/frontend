<script lang="ts">
    import { text_embed } from "$components/NotificationEmbeds/TextEmbed.svelte";
    import { notificationStore } from "$components/Stores/SignalrStore.svelte";
    import { toasts } from "$components/Stores/ToastStore.svelte";
    import FooterLink from "./FooterLink.svelte";
</script>

<!--
@component
Footer block with basic misc links
-->
<div class="footer">
    <FooterLink string="about" link="/about" />
    <FooterLink string="contact" link="/contact" />
    <!-- <button onclick={() => notificationStore.disconnect()}
        >DEBUG: Disconnect from notifications</button
    >
    <button onclick={() => toasts.add("test", text_embed, "error")}
        >DEBUG: Notify</button
    > -->
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
