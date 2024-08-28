<script lang="ts">
  import { type Order, Size } from "$lib/types";

  let { order, price = $bindable(0) }: { order: Order[]; price: number } =
    $props();

  const PRICES: Record<Size, Record<number, number>> = {
    [Size["15cm"]]: {
      1: 15,
      3: 40,
    },
    [Size["30cm"]]: {
      1: 20,
      3: 50,
    },
  };

  $effect(() => {
    price = order.reduce((sum, item) => {
      const PRICE = PRICES[item.size];
      const price =
        ((item.amount / 3) | 0) * PRICE[3] + (item.amount % 3) * PRICE[1];
      return sum + price;
    }, 0);
  });
</script>

<p>€ {price},-</p>
