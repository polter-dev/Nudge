import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { env } from "../../env"; // Adjust based on your env file location

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    // This securely verifies the email using the code from the URL
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect the user to the login page with a success message
  return NextResponse.redirect(`${origin}/login?message=Email confirmed! You can now log in.`);
}