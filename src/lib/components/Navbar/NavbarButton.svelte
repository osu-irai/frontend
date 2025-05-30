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
  }
  p {
    margin: auto;
    width: auto;
  }
</style>
