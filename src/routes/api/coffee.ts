import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import axios from "redaxios";
import { CoffeeType } from "~/utils/coffee";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";

export const APIRoute = createAPIFileRoute("/api/coffee")({
  GET: async ({ request, params }) => {
    console.info(`Fetching all coffee... @`, request.url);
    try {
      const supabase = getSupabaseServerInstance();
      // const res = await axios.get<CoffeeType[]>(
      //   "https://jsonplaceholder.typicode.com/users/",
      // );

      const res = {
        data: [
          {
            id: 1,
            name: "Espresso",
          },
          {
            id: 2,
            name: "Latte",
          },
          {
            id: 3,
            name: "Cappuccino",
          },
        ],
      };

      return json(
        res.data.map(({ id, name }) => ({
          id: id.toString(),
          name,
        })),
      );
    } catch (e) {
      console.error(e);
      return json({ error: "User not found" }, { status: 404 });
    }
  },
});
