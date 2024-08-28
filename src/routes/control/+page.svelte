<script lang="ts">
  let w: WindowProxy;

  const open = () => {
    w = window.open("/", "window", "popup")!;

    w.addEventListener("load", () => {
      const main = w.document.querySelector("main");
      console.log("loaded");
      console.log(main);
      main!.requestFullscreen();
    });
  };
</script>

<h1>Order</h1>

<form>
  <label>
    LED

    <select>
      <option>White</option>
      <option>Red</option>
      <option>Green</option>
      <option>Blue</option>
      <option>Pink</option>
    </select>
  </label>

  <label>
    Sleeve

    <select>
      <option>Transparent</option>
      <option>White</option>
      <option>Purple</option>
      <option>Green</option>
    </select>
  </label>

  <label>
    Amount

    <input type="number" min="1" max="100" value="1" />
  </label>

  <button>Submit</button>
</form>

<button on:click={open}>Open window</button>
