import { getContext, setContext } from "svelte";

export type Token = string & { readonly __tag: unique symbol };
const global_token: Token | null = null;

export function setToken(token: Token | null) {
  setContext(global_token, token as Token);
}

export function getToken(): Token | null {
  return getContext(global_token);
}

export function isAuthenticated() {
  return getContext(global_token) !== null;
}
