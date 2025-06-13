<script lang="ts">
  import type { GetApiRequestsSelfResponse } from "../../../api/gen";
  import RequestForm from "$components/RequestForm.svelte";
  const { data } = $props();
</script>

<RequestForm />
