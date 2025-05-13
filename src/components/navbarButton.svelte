<script lang="ts">
  let { text, destination } = $props(); 
</script>

<a href={destination}>
  <div>{text}</div>
</a>

<style lang="scss">
    a {
      width: auto;
      margin: auto;
    }
    div {
      margin: auto;
      width: auto;
    }
</style>
