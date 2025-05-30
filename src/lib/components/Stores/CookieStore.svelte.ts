import { getContext, setContext } from "svelte";

const global_token: string | null = null;

export function setToken(token: string | null) {
  setContext(global_token, token);
}

export function getToken(): string | null {
  return getContext(global_token);
}

export function isAuthenticated() {
  return getContext(global_token) !== null;
}
