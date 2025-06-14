<script lang="ts">
  import type { GetApiRequestsSelfResponse } from "../../../api/gen";
  import RequestForm from "$components/RequestForm.svelte";
  const { data } = $props();
</script>

<div class="base">
  <RequestForm />
</div>

<style lang="scss">
  .base {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
