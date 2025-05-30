import { getContext, setContext } from "svelte";
import type { GetSelfUserRequestResponse } from "../../../api/gen";

const global_user: GetSelfUserRequestResponse | null = null;

export function setUser(user: GetSelfUserRequestResponse | null) {
  setContext(global_user, user);
}

export function getUser(): GetSelfUserRequestResponse | null {
  return getContext(global_user);
}
