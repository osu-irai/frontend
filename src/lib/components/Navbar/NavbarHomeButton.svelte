<script lang="ts">
  import UserMenu from "$components/Menus/UserMenu.svelte";
  import { getUser } from "$components/Stores/UserStore.svelte";
  const { user } = getUser()!;
  let isVisible = $state(false);
  let buttonRect: HTMLDivElement | undefined = $state();
  // HACK: A bit dirty
  let buttonSize: DOMRect | undefined = $derived(
    buttonRect?.getBoundingClientRect(),
  );
</script>

<svelte:window
  onresize={() => {
    buttonSize = buttonRect?.getBoundingClientRect();
  }}
/>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="outer"
  onclick={() => (isVisible = !isVisible)}
  role="button"
  tabindex="0"
  bind:this={buttonRect}
>
  <div class="inner">
    <img src={user.avatarUrl} alt="Avatar of user {user.id}" />
    <div>
      <text>{user.username}</text>
    </div>
  </div>
</div>
<UserMenu {isVisible} parentPosition={buttonSize} />

<style lang="scss">
  .inner {
    width: auto;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .outer {
    color: var(--ctp-macchiato-blue);
    width: auto;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .outer:hover {
    cursor: pointer;
    color: var(--ctp-macchiato-yellow);
  }
  img {
    margin-right: 20px;
    width: 24px;
  }
</style>
