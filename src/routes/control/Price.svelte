<script lang="ts">
  import { type Order, Size } from "$lib/types";

  let { order, price = $bindable(0) }: { order: Order[]; price: number } =
    $props();

  const PRICES: Record<Size, Record<number, number>> = {
    [Size["15cm"]]: {
      1: 15,
    },
    [Size["30cm"]]: {
      1: 20,
      3: 50,
    },
  };

  $effect(() => {
    price = order.reduce((sum, item) => {
      const PRICE = PRICES[item.size];
      const staffels = Object.keys(PRICE)
        .map((s) => parseInt(s))
        .sort()
        .reverse();
      let price = 0;
      let amount = item.amount;
      for (const count of staffels) {
        price += Math.floor(amount / count) * PRICE[count];
        amount %= count;
        if (!amount) break;
      }
      return sum + price;
    }, 0);
  });
</script>

€ {price},-
