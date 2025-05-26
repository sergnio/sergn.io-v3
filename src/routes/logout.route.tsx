import { createFileRoute } from "@tanstack/react-router";
import { logoutUser } from "~/utils/users";

export const Route = createFileRoute("/logout")({
  preload: false,
  loader: () => logoutUser(),
});
