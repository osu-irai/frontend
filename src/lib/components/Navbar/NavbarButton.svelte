<script lang="ts">
  let { text, destination } = $props();
</script>

<a href={destination}>
  <p>{text}</p>
</a>

<style lang="scss">
  a {
    width: auto;
    margin: auto;
    text-decoration: none;
  }
  a:hover {
    color: var(--ctp-macchiato-yellow);
  }
  p {
    margin: auto;
    width: auto;
  }
</style>
