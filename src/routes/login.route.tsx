import { createFileRoute } from "@tanstack/react-router";
import { FormEvent } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Login" }],
  }),
  component: LoginComponent,
});

interface Props {
  error?: string;
}
export function LoginComponent({ error }: Props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get("username");
    const password = form.get("password");
    console.log("Login submitted:", { username, password });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
        >
          Sign in
        </button>
      </form>
      {error && (
        <div
          role="alert"
          className="mt-4 rounded-md bg-red-100 border border-red-300 text-red-800 px-4 py-3"
        >
          {error}
        </div>
      )}
    </div>
  );
}
