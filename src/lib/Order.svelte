<script lang="ts">
  import { Size, type Order } from "./types";

  let {
    order,
    editable = false,
    number,
  }: { order: Order[]; editable?: Boolean; number?: number } = $props();
</script>

<section class="order">
  <h1>Order</h1>
  {#each order as item, i}
    {@const text = `${item.amount}x ${Size[item.size]}`}
    {#if editable}
      <button
        onclick={() => {
          if (number && number > 0) {
            item.amount = number;
            number = 0;
          }
        }}
      >
        {text}
      </button>
    {:else}
      <p>{text}</p>
    {/if}
  {/each}
</section>
