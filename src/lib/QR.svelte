<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  const props = $props();

  let QRX = $state();

  onMount(async () => {
    if (browser) {
      QRX = (await import("@qr-x/svelte")).default;
    }
  });
</script>

{#if QRX}
  <QRX
    gradient={{
      type: "linear",
      colors: ["var(--green)", "var(--light-green)", "var(--green)"],
    }}
    shapes={{
      body: "diamond",
      eyeball: "leaf",
      eyeframe: "leaf",
    }}
    {...props}
  />
{/if}
