import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

import { MatchingClient } from "~/components/session/MatchingClient";
import { env } from "~/env";

export default async function PartnerMatchingPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // RSC read-only; session refresh happens via client / middleware.
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return <MatchingClient />;
}
