import { parseCookies, setCookie } from "@tanstack/react-start/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Creates a Supabase server instance using environment variables, which is used to interface
 * with the Supabase backend (provided the environment variables are set).
 */
export function getSupabaseServerClient() {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase URL and Anon Key must be set in environment variables.",
    );
  }

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      // @ts-ignore Wait till Supabase overload works
      getAll() {
        return Object.entries(parseCookies()).map(([name, value]) => ({
          name,
          value,
        }));
      },
      setAll(cookies) {
        cookies.forEach((cookie) => {
          setCookie(cookie.name, cookie.value);
        });
      },
    },
  });
}
