<script lang="ts">
  import Background from "$lib/Background.svelte";
  import OrderComponent from "$lib/Order.svelte";
  import Qr from "$lib/QR.svelte";

  import QR from "$lib/QR.svelte";
  import { Size, type Order } from "$lib/types";
  import Price from "./control/Price.svelte";

  const links = [
    ["cables.dxlb.nl", "https://cables.dxlb.nl"],
    ["@twinklepatchcables", "https://www.instagram.com/twinklepatchcables/"],
  ];

  let order = $state<Order[]>([]);
  let price = $state<number>(0);
</script>

<svelte:window
  onmessage={(event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    if (data.type === "order") {
      order = data.order;
    }
  }}
/>
<Background />

<main>
  <section class="socials">
    <ul>
      <li>Light up your patch!</li>
      <li>Unique LED cables</li>
      <li>Handmade with care in Delft</li>
      <li>Many options and colors</li>
    </ul>
    {#each links as [name, link]}
      <section>
        <QR width="8rem" data={link} />
        <a href={link}>{name}</a>
      </section>
    {/each}
  </section>

  <section class="logo">
    <h1>TwinkePatch</h1>
    <img src="/logo-clean.svg" />
    <h1>Cables</h1>
  </section>

  <section class="prices">
    <section class="card">
      <h2>15CM</h2>
      <p>€ 15,-</p>
    </section>
    <section class="card">
      <h2>30CM</h2>
      <p>€ 20,-</p>
      <p>3 for € 50,-!</p>
    </section>

    {#if order.length}
      <section class="vstack card order">
        <OrderComponent {order} />

        <p>
          Total:

          <Price {order} bind:price />
        </p>

        <p>Scan for payment:</p>
        {#if order.length}
          {@const url = `https://bunq.me/twinklepatchcables/${price}/patchcables+${order
            .map(({ size, amount }) => `${amount}x${Size[size]}`)
            .join("+")}`}
          <a href={url}>
            <Qr
              data={url}
              gradient={{
                type: "linear",
                colors: ["var(--purple)", "var(--black)", "var(--purple)"],
              }}
            />
          </a>
        {/if}
      </section>
    {/if}
  </section>
</main>

<style>
  main {
    position: absolute;
    inset: 0;

    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: start;
    place-items: center;

    .prices {
      display: grid;
      grid-auto-flow: row;
      gap: 1rem;
      padding: 1rem;
      align-self: start;
      justify-self: end;
      color: var(--black);

      .card {
        background: var(--green);
        color: var(--white);
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        & > * {
          margin: 0;
        }

        p {
          margin-left: 1rem;
        }
      }
    }
  }

  .order {
    h1 {
      margin: 0;
    }
  }
  .socials {
    align-self: end;
    display: grid;
    grid-gap: 2rem;
    padding: 1rem;
    section {
      display: grid;
      justify-items: center;
    }
  }
  .logo {
    display: grid;
    place-items: center;
  }
  img {
    max-width: 100%;
  }
  h1 {
    font-weight: 900;
    color: var(--green);
    text-shadow: 0 0 10px rgba(213, 109, 178, 0.841);
  }
</style>
