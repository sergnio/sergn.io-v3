import { createServerFn } from "@tanstack/react-start";
import axios from "redaxios";

export type LoginUser = {
  email: string;
  password: string;
};

export const loginFn = createServerFn({ method: "POST" })
  .validator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    try {
      await axios.post("/users/login", data);
    } catch (e) {
      return {
        error: true,
        message: "Failed to login",
      };
    }
  });
