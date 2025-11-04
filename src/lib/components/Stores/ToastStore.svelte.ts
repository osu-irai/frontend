import { text_embed } from "$components/NotificationEmbeds/TextEmbed.svelte";
import type { Snippet } from "svelte";
import type { Component } from "svelte";
import { writable } from "svelte/store";

export type ToastType = "success" | "info" | "error";
export type Toast = {
    id: number;
    data: any;
    component: Snippet<[any]>;
    type: ToastType;
};
/** Generates a toast store */
function createToastStore() {
    const { subscribe, update } = writable<Toast[]>([]);

    return {
        subscribe,
        add: (
            data: any,
            component: Snippet<[any]> = text_embed,
            type: ToastType = "info",
        ) => {
            const id = Date.now();
            update((toasts) => [...toasts, { id, data, component, type }]);

            // Auto-remove after 3 seconds
            setTimeout(() => {
                update((toasts) => toasts.filter((toast) => toast.id !== id));
            }, 3000);
        },
    };
}

export const toasts = createToastStore();
