import { getContext, setContext } from "svelte";
import type { GetUserResponse } from "$types/responses.ts";

const global_user: GetUserResponse | null = null;

export function setUser(user: GetUserResponse | null) {
    setContext(global_user, user);
}

export function getUser(): GetUserResponse | null {
    return getContext(global_user);
}
