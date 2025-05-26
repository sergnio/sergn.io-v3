import { createFileRoute, redirect } from "@tanstack/react-router";
import { logoutUser } from "~/utils/users";
import { GET_AUTHENTICATED_USERS_KEY } from "~/constants/query-keys";

export const Route = createFileRoute("/logout")({
  preload: false,
  loader: async ({ context }) => {
    // redirect to the home page if the user is not logged in
    const user = context.queryClient.getQueryData(GET_AUTHENTICATED_USERS_KEY);
    if (user) {
      await logoutUser();
      await context.queryClient.invalidateQueries({
        queryKey: GET_AUTHENTICATED_USERS_KEY,
      });
    }

    throw redirect({
      href: "/",
    });
  },
});
