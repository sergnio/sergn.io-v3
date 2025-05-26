import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authRoute")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
        search: {
          error: "You must be logged in to access that page",
        },
      });
    }
  },
});
