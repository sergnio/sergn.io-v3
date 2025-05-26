import { LoginComponent } from "~/routes/login.route";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authRoute")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === "Not authenticated") {
      return <LoginComponent />;
    }

    throw error;
  },
});
