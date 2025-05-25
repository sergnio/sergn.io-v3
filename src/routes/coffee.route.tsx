import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { coffeeQueryOptions } from "~/utils/coffee";

export const Route = createFileRoute("/coffee")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(coffeeQueryOptions());
  },
  head: () => ({
    meta: [{ title: "Coffee" }],
  }),
  component: CoffeeComponent,
});

function CoffeeComponent() {
  const { data } = useSuspenseQuery(coffeeQueryOptions());

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {data.length === 0 ? (
          <li className="whitespace-nowrap">No coffee found</li>
        ) : (
          data.map(({ id, name, price }) => (
            <li key={id} className="whitespace-nowrap">
              <div>{name}</div>
              <div>Price: {price}</div>
            </li>
          ))
        )}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
