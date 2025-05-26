import { createFileRoute, redirect } from "@tanstack/react-router";
import { loggedInUserQueryOptions, logoutUser } from "~/utils/users";

export const Route = createFileRoute("/logout")({
  preload: false,
  loader: async ({ context }) => {
    console.log("Logging out user...");
    await logoutUser();
    await context.queryClient.invalidateQueries({
      queryKey: loggedInUserQueryOptions().queryKey,
    });
    redirect({
      href: "/",
    });
  },
});
