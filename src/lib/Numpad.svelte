<script lang="ts">
  let { number = $bindable(0) }: Props = $props();
</script>

<section class="numpad">
  <span>{number}</span>
  {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as key}
    <button onclick={() => (number = parseInt(number.toString() + key))}
      >{key}</button
    >
  {/each}
  <button class="btn-clear" onclick={() => (number = 0)}>C</button>
</section>

<style>
  section {
    --size: 2ch;
    display: grid;
    grid-template-columns: repeat(3, var(--size));
    grid-auto-rows: var(--size);
    font-size: 2rem;
    gap: 0.5rem;

    span {
      grid-column: span 3;
    }

    .btn-clear {
      grid-column: span 2;
    }
  }
</style>
