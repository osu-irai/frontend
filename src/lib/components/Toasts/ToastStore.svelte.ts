import { writable } from "svelte/store";

export type ToastType = "success" | "info" | "error";
export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};
function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  return {
    subscribe,
    add: (message: string, type: ToastType = "info") => {
      const id = Date.now();
      update((toasts) => [...toasts, { id, message, type }]);

      // Auto-remove after 3 seconds
      setTimeout(() => {
        update((toasts) => toasts.filter((toast) => toast.id !== id));
      }, 3000);
    },
  };
}

export const toasts = createToastStore();
