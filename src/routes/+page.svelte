<script lang="ts">
  const keydown = (e: KeyboardEvent) => {
    document.body.requestFullscreen();
  };
</script>

<svelte:window on:keydown={keydown} />

<main>
  <!-- Find a nice font -->

  <h1>TwinkePatch Cables</h1>

  <p>Light up your patch!</p>
  <p>Unique LED cables</p>
  <p>Handmade with care in Delft</p>
  <p>Many options and colors</p>

  <h2>MAIN</h2>
</main>

<style>
  main {
    background: pink;
  }
</style>
