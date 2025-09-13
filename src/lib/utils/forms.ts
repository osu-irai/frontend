import { err, ok, type Result } from "neverthrow";
import { ParseError } from "$types/errors.ts";

export function getValueFromForm(
  form: FormData,
  fieldName: string,
  errorType: ParseError,
): Result<string, ParseError> {
  const entry = form.get(fieldName);
  return entry === null ? err(errorType) : ok(entry.toString());
}

export function parseValueFromRegex<E>(
  value: string,
  regex: RegExp,
  error: E,
): Result<number, E> {
  const capture = regex.exec(value);
  const first = capture?.[1];
  return first === undefined ? err(error) : ok(parseInt(first));
}
