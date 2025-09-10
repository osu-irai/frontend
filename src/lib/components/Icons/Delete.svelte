<script lang="ts">
    import { getToken } from "$components/Stores/CookieStore.svelte";
    const headers = new Headers();
    const token = getToken();
    let { id, nodeRef }: { id: number; nodeRef: Node } = $props();
    async function delete_request(requestId: number) {
        headers.append("Cookie", `osuToken=${token}`);
        fetch(`http://localhost:5077/api/requests/own?requestId=${requestId}`, {
            credentials: "include",
            method: "DELETE",
            headers: headers,
        });
    }
    const func = () => {
        delete_request(id);
        nodeRef.parentNode?.removeChild(nodeRef);
    };
</script>

<div>
    <button aria-label="delete" onclick={async () => func()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
                fill="currentColor"
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
        </svg>
    </button>
</div>

<style lang="scss">
    div {
        height: 100%;
        width: 100%;
        border: none;
        visibility: visible;
    }
    button {
        display: none;
        border: none;
        width: 100%;
        height: 100%;
    }
    div:hover button {
        display: block;
        visibility: visible;
    }
    button svg {
        color: var(--ctp-macchiato-base);
    }
    button:hover {
        background-color: var(--ctp-macchiato-red);
    }
</style>
