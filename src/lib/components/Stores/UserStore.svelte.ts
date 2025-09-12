import { getContext, setContext } from "svelte";
import type { GetUserSelfResponse } from "../../api/types/responses.ts";

const global_user: GetUserSelfResponse | null = null;

export function setUser(user: GetUserSelfResponse | null) {
  setContext(global_user, user);
}

export function getUser(): GetUserSelfResponse | null {
  return getContext(global_user);
}
