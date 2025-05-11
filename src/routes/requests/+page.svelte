<script lang="ts">
    import type {GetApiRequestsSelfResponse} from "../../api/gen";
    import Beatmap from "../../components/beatmap.svelte";
    import beatmap from "../../components/beatmap.svelte";

    const data = $props();
    const inner: [GetApiRequestsSelfResponse] = data.data.data;
    console.log(inner);
</script>

{#each inner as value (value.id)}
        <Beatmap data={value.beatmap} />
    {/each}