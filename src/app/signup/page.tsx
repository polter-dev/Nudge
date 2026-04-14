"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { env } from "../../env";

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SignUpPage() {
  const router = useRouter();
  
  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // UI State
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false); // Tracks if we should show the resend screen

  // 1. Initial Sign Up (Magic Link)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Remember to set this to your callback route!
        emailRedirectTo: `${window.location.origin}/auth/callback`, 
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Show the success screen with the resend button
    setIsSignedUp(true);
    setLoading(false);
  };

  // 2. Resend Confirmation Email
  const handleResendEmail = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (resendError) {
      setError(resendError.message);
    } else {
      setSuccessMessage("A new confirmation link has been sent!");
    }
    
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {isSignedUp ? "Check your inbox" : "Create your account"}
          </h2>
        </div>
        
        {/* SHOW SUCCESS / RESEND SCREEN */}
        {isSignedUp ? (
          <div className="mt-8 space-y-6 text-center">
            <p className="text-gray-600">
              We sent a magic link to <strong>{email}</strong>. Click it to confirm your account.
            </p>
            
            {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>}
            {successMessage && <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">{successMessage}</div>}

            <button
              onClick={handleResendEmail}
              disabled={loading}
              className="mt-4 w-full rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Resend confirmation link"}
            </button>
            
            <p className="mt-4 text-sm text-gray-600">
              Once confirmed, you can{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                log in here
              </Link>.
            </p>
          </div>
        ) : (
          
          /* SHOW STANDARD SIGNUP FORM */
          <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <input
                  type="email"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-70"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        )}

        {!isSignedUp && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in instead
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}