<script lang="ts">
    import { getColor } from "$utils/colors";

    const { starRating }: { starRating: number } = $props();
    const color = getColor(starRating);
</script>

<div style="background-color: {color};" class="sr-pill">
    <span class="star-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
            ><path
                fill="currentColor"
                d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"
            /></svg
        >
    </span>
    <p>{starRating.toFixed(2)}</p>
</div>

<style lang="scss">
    .star-icon {
        margin: 2px 2px 2px 5px;
        height: 25%;
        width: 15px;
    }
    .sr-pill {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 5px;
        border-radius: 10px;
        height: fit-content;
        width: max-content;
        color: var(--ctp-macchiato-base);
        display: flex;
        flex-direction: row;
    }
    .sr-pill p {
        margin: 2px 5px;
    }
</style>
