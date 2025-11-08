import { writable } from "svelte/store";
import * as signalR from "@microsoft/signalr";
import type { GetRequestsResponse } from "$types/responses.ts";
import { toasts } from "$components/Stores/ToastStore.svelte.ts";
import { PUBLIC_IRAI_API } from "$env/static/public";
import { request_embed } from "$components/NotificationEmbeds/RequestEmbed.svelte";
import { text_embed } from "$components/NotificationEmbeds/TextEmbed.svelte";

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
                            toasts.add(
                                "Reconnecting to server...",
                                text_embed,
                                "info",
                            );
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
                toasts.add(foo, request_embed, "success");
            });

            connection.on("ReceiveGlobalNotification", (foo: string) => {
                console.log(foo);
                toasts.add(`Global notification: ${foo}`, text_embed, "info");
            });

            connection.onclose(() => {
                toasts.add("Connection lost", text_embed, "error");
            });

            try {
                await connection.start();
                await connection.invoke("JoinUserGroup", userId);
                console.log("SignalR Connected");
            } catch (err) {
                console.error("SignalR Connection Error:", err);
                toasts.add(
                    "Failed to connect to notifications. If you see this, reload the page",
                    text_embed,
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
