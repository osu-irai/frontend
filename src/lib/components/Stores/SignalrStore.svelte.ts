import { writable } from "svelte/store";
import * as signalR from "@microsoft/signalr";
import type { GetRequestsResponse } from "$types/responses.ts";
import { toasts } from "$components/Stores/ToastStore.svelte.ts";
import { PUBLIC_IRAI_API } from "$env/static/public";

function createNotificationStore() {
    const { subscribe, update } = writable<GetRequestsResponse[]>([]);

    let connection: signalR.HubConnection | null = null;

    return {
        subscribe,
        connect: async (userId: number) => {
            console.log(PUBLIC_IRAI_API);
            connection = new signalR.HubConnectionBuilder()
                .withUrl(`${PUBLIC_IRAI_API}ws/notifications`)
                .withAutomaticReconnect({
                    nextRetryDelayInMilliseconds: (retryContext: {
                        previousRetryCount: number;
                    }) => {
                        // Show toast on reconnection attempts
                        if (retryContext.previousRetryCount > 0) {
                            toasts.add("Reconnecting to server...", "info");
                        }
                        return Math.min(
                            1000 * Math.pow(2, retryContext.previousRetryCount),
                            30000,
                        );
                    },
                })
                .build();

            connection.on("ReceiveRequest", (foo: GetRequestsResponse) => {
                console.log("Received request:", foo);
                update((foos) => [foo, ...foos]);

                // Show toast notification
                toasts.add(`New notification: ${foo.beatmap.title}`, "success");
            });

            connection.onclose(() => {
                toasts.add("Connection lost", "error");
            });

            try {
                await connection.start();
                await connection.invoke("JoinUserGroup", userId);
                console.log("SignalR Connected");
            } catch (err) {
                console.error("SignalR Connection Error:", err);
                toasts.add(
                    "Failed to connect to notifications. If you see this, reload the page",
                    "error",
                );
            }
        },
        disconnect: async () => {
            if (connection) {
                await connection.stop();
                connection = null;
            }
        },
    };
}

export const notificationStore = createNotificationStore();
