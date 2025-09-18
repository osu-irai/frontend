<script>
    import { toasts } from "$components/Stores/ToastStore.svelte.ts";
</script>

<!--
@component
Base container for toast notification display
 -->
{#if $toasts.length > 0}
    <div class="toast-container">
        {#each $toasts as toast (toast.id)}
            <div class="toast toast-{toast.type}">
                <div class="highlight-{toast.type}"></div>
                {toast.message}
            </div>
        {/each}
    </div>
{/if}

<style>
    .toast-container {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .toast {
        padding: 12px 16px;
        border-radius: 6px;
        color: var(--ctp-macchiato-text);
        background-color: var(--ctp-macchiato-surface0);
        font-size: 14px;
        font-weight: 500;
        min-width: 250px;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    }

    .highlight-info {
        width: 2px;
        background-color: var(--ctp-macchiato-blue);
        height: 80%;
    }

    .toast-info {
        border-left: 5px solid var(--ctp-macchiato-blue);
    }

    .toast-success {
        border-left: 5px solid var(--ctp-macchiato-green);
    }

    .toast-warning {
        border-left: 5px solid var(--ctp-macchiato-yellow);
    }

    .toast-error {
        border-left: 5px solid var(--ctp-macchiato-red);
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
</style>
