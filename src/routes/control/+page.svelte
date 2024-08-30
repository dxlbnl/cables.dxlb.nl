<script lang="ts">
  import Numpad from "$lib/Numpad.svelte";
  import OrderComponent from "$lib/Order.svelte";
  import Qr from "$lib/QR.svelte";
  import { Size, type Order } from "$lib/types";
  import { enhance } from "$app/forms";
  import Price from "./Price.svelte";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();

  let order = $state<Order[]>([]);
  let price = $state(0);

  let popup = $state<WindowProxy>();
  let number = $state(0);

  const open = () => {
    popup = window.open("/", "window", "popup")!;
    popup.postMessage(JSON.stringify({ type: "init" }), "*");
  };

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

  const submit = () => {
    if (!popup) return;
    popup.postMessage(JSON.stringify({ type: "order", order }), "*");
  };
  const paid = () => {
    if (!popup) return;
    popup.postMessage(JSON.stringify({ type: "order", order }), "*");
  };
  const clear = () => {
    order = [];
    submit();
  };
</script>

<main>
  {#if order}
    <OrderComponent {order} editable {number} />
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
      <Price {order} {price} />
      <section class="stack">
        <button onclick={submit}>Submit</button>

        <form method="POST" use:enhance>
          <input
            type="hidden"
            name="order"
            value={JSON.stringify({ order, price })}
          />
          <button onclick={paid}>Paid</button>
        </form>
      </section>
      <button onclick={clear}>Clear</button>
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
