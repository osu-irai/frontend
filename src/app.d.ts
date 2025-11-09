// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
// declare global {
// namespace App {
// interface Error {}
// interface Locals {}
// interface PageData {}
// interface PageState {}
// interface Platform {}
// }
// }

declare namespace App {
  interface PublicEnv {
    PUBLIC_IRAI_API: string;
  }
}
