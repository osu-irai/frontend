import { err, ok, Result } from "neverthrow";
import { getContext, setContext } from "svelte";

export type Token = string & { readonly __tag: unique symbol };
const global_token: Result<Token, null> = err(null);

export function setToken(token: string) {
  setContext(global_token, ok(token as Token));
}

export function getToken(): Result<Token, null> {
  const tok = getContext(global_token) as Result<Token, null>;
  return tok;
}

export function isAuthenticated() {
  const tok = getToken();
  if (tok === undefined || tok === null) {
    return false;
  }
  return tok.isOk();
}
