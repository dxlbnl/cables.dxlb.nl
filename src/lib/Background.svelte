<script>
  import { onMount } from "svelte";

  let time = $state(Date.now());
  let running = true;

  const tick = () => {
    time = Date.now();

    if (running) requestAnimationFrame(tick);
  };

  onMount(() => {
    requestAnimationFrame(tick);

    return () => {
      running = false;
    };
  });

  let hlines = $state(Array(20).fill({}));
  let vlines = $state(Array(20).fill({}));
  let scale = 3;
  let hspeed = 19300;
  let vspeed = 20200;

  $effect(() => {
    hlines.forEach((line, i) => {
      line.x1 = -20;
      line.y1 = Math.log(1 + i + Math.sin(time / hspeed + i) * 0.2) * scale;
      line.x2 = 20;
      line.y2 =
        Math.log(1 + i + Math.cos(time / hspeed + i) * 0.2) * scale * 1.3;
    });
    vlines.forEach((line, i) => {
      line.y1 = -100;
      line.x1 = i + Math.sin((time / vspeed) * (1 + i));
      line.y2 = 100;
      line.x2 = i + Math.cos(time / vspeed + i) * 1.3;
    });
  });
</script>

<svg
  viewBox="0 0 10 10"
  height="100%"
  width="100%"
  preserveAspectRatio="xMidYMid meet"
>
  <defs>
    <linearGradient id="hgradient" gradientUnits="userSpaceOnUse">
      <stop stop-color="var(--black)" offset="0%" />
      <stop stop-color="var(--purple)" offset="100%" />
    </linearGradient>
    <linearGradient
      id="vgradient"
      gradientUnits="userSpaceOnUse"
      gradientTransform="rotate({Math.sin(time / vspeed) * 200})"
    >
      <stop stop-color="var(--black)" offset="0%" stop-opacity="0.6" />
      <stop stop-color="var(--green)" offset="100%" stop-opacity="0.2" />
    </linearGradient>
    <filter id="blur" width="110%" height="100%">
      <feGaussianBlur stdDeviation=".02" result="blur" />
    </filter>
  </defs>

  <g class="background">
    <rect x="-10" y="0" width="25" height="10" fill="url(#hgradient)" />
    <rect x="-10" y="0" width="25" height="10" fill="url(#vgradient)" />

    <g class="lines">
      {#each hlines as line}
        <line {...line} />
      {/each}
    </g>
    <g class="lines">
      {#each vlines as line}
        <line {...line} />
      {/each}
    </g>
  </g>
</svg>

<style>
  svg {
    position: fixed;
    inset: 0;
    background: var(--black);
  }

  rect {
    mix-blend-mode: saturation;
  }

  .stop1 {
    stop-color: var(--purple);
  }
  .stop3 {
    stop-color: var(--green);
  }

  .lines {
    filter: url(#blur);
  }

  line {
    stroke: rgba(255, 255, 255, 0.332);
    stroke-width: 0.02;
  }
</style>
