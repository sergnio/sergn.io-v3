import { createFileRoute } from "@tanstack/react-router";
import { FormEvent } from "react";
import { ErrorAlert } from "~/components/ErrorAlert";
import useLoginMutation from "~/hooks/mutations/useLoginMutation";

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
  const { mutate, error: mutationError, isPending } = useLoginMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    mutate({ data: { email, password } });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4" inert={isPending}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
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
      {error && <ErrorAlert message={error} />}
      {mutationError && <ErrorAlert message={mutationError.message} />}
    </div>
  );
}
