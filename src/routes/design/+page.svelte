<script>
  import "@fontsource-variable/orbitron";
  import Background from "$lib/Background.svelte";

  import QRX from "@qr-x/svelte";

  const links = [
    ["cables.dxlb.nl", "https://cables.dxlb.nl"],
    ["@twinklepatchcables", "https://www.instagram.com/twinklepatchcables/"],
  ];
</script>

<Background />

<main>
  <section class="socials">
    {#each links as [name, link]}
      <section>
        <QRX
          width="8rem"
          data={link}
          gradient={{
            type: "linear",
            colors: ["var(--green)", "var(--green2)", "var(--green)"],
          }}
          shapes={{
            body: "diamond",
            eyeball: "leaf",
            eyeframe: "leaf",
          }}
        />
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
      <h2>30CM</h2>
      <p>20 euro</p>
      <p>3 for 50 euro!</p>
    </section>
    <section class="card">
      <h2>15CM</h2>
      <p>15 euro</p>
      <p>3 for 40 euro!</p>
    </section>
  </section>
</main>

<style>
  main {
    position: absolute;
    inset: 0;
    color: var(--black);

    display: grid;
    grid-auto-flow: column;
    grid-template-columns: min-content auto 20ch;
    place-items: center;

    .prices {
      display: grid;
      grid-auto-flow: row;
      gap: 1rem;
      padding: 1rem;
      align-self: start;
      justify-self: end;

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
