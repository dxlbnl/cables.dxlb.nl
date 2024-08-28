<script lang="ts">
  import Numpad from "$lib/Numpad.svelte";
  import Qr from "$lib/QR.svelte";
  import { Size, type Order } from "$lib/types";
  import Price from "./Price.svelte";

  let order = $state<Order[]>([]);
  let price = $state(0);

  let w: WindowProxy;
  let number = $state(0);

  const open = () => {
    w = window.open("/", "window", "popup")!;

    w.addEventListener("load", () => {
      const main = w.document.querySelector("main");
      console.log("loaded");
      console.log(main);
      main!.requestFullscreen();
    });
  };

  $effect(() => console.log(order));
  const addItem = (size: number) => {
    console.log($state.snapshot(order));
    const item = order.find((item) => item.size === size);
    if (item) {
      item.amount += number || 1;
    } else {
      order.push({ size: size, amount: number || 1 });
    }
    number = 0;
  };
  console.log(Size);
</script>

<main>
  {#if order}
    <section class="order">
      <h1>Order</h1>
      {#each order as item, i}
        <button
          onclick={() => {
            if (number > 0) {
              item.amount = number;
              number = 0;
            }
          }}
        >
          <p>{item.amount}x {Size[item.size]}</p>
        </button>
      {/each}
    </section>
  {/if}

  <section class="stack">
    <section class="stack">
      {#each Object.entries(Size).filter(([k, v]) => typeof v === "number") as [label, size]}
        <button onclick={() => addItem(size)}>
          {label}
        </button>
      {/each}
    </section>

    <Numpad bind:number />

    <section class="vstack">
      <Price {order} bind:price />

      <button>Submit</button>
      <button onclick={() => (order = [])}>Clear</button>

      {#if order.length}
        {@const url = `https://bunq.me/twinklepatchcables/${price}/${order
          .map(({ size, amount }) => `${amount}x${Size[size]}`)
          .join("+")}`}
        <a href={url}>
          <Qr data={url} />
        </a>
        />
      {/if}
    </section>
  </section>

  <button onclick={open} class="secondary">Open window</button>
</main>

<style>
  main {
    display: grid;
    padding: 1rem;
    gap: 1rem;

    .order {
      display: grid;
      grid-auto-flow: row;
      gap: 1rem;

      button {
        padding: 0;
        font-size: 1rem;
      }

      .focus {
        outline: 0.5rem solid var(--purple);
      }
    }
  }
</style>
