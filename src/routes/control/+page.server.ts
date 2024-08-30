import type { Actions } from "./$types";

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const raworder = await data.get("order");
    console.log(raworder);
    if (typeof raworder === "string") {
      const order = JSON.parse(raworder);
      console.log(order);
    }
    // TODO log the user in
  },
} satisfies Actions;
