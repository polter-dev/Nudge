"use client";

import { useState, useEffect } from "react";
import { api } from "../../trpc/react"; // Adjust this import to match your tRPC setup
import { createClient } from "@supabase/supabase-js";

// 1. Initialize your frontend Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthTestPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<any>(null);

  // Check if we are already logged in on page load
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  // 2. Setup the tRPC query (it won't run automatically because we disabled it)
  const secretQuery = api.auth.getSecretMessage.useQuery(undefined, {
    enabled: false, // Don't fetch on load, only when we click the button
    retry: false,   // Don't keep retrying if it fails (so we can see the error)
  });

  // 3. Frontend Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) alert("Login Failed: " + error.message);
    else setSession(data.session);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    secretQuery.refetch(); // Refetch to prove it's locked again
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", fontFamily: "sans-serif" }}>
      <h2>Security Test Sandbox</h2>

      {/* LOGIN FORM */}
      {!session ? (
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input 
            type="email" placeholder="Email" value={email} 
            onChange={(e) => setEmail(e.target.value)} required 
          />
          <input 
            type="password" placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)} required 
          />
          <button type="submit">Log In to Frontend</button>
        </form>
      ) : (
        <div style={{ marginBottom: "20px", padding: "10px", background: "#d4edda" }}>
          <p>✅ <strong>Logged in via Supabase:</strong> {session.user.email}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}

      <hr style={{ margin: "20px 0" }} />

      {/* tRPC API TEST */}
      <h3>Test tRPC Protected API</h3>
      <button onClick={() => secretQuery.refetch()} style={{ marginBottom: "10px" }}>
        Fetch Secret Data
      </button>

      {secretQuery.isFetching && <p>Loading...</p>}
      
      {secretQuery.error && (
        <div style={{ padding: "10px", background: "#f8d7da", color: "#721c24" }}>
          <p>❌ <strong>tRPC Error:</strong> {secretQuery.error.message}</p>
        </div>
      )}

      {secretQuery.data && (
        <div style={{ padding: "10px", background: "#cce5ff", color: "#004085" }}>
          <p>🎉 <strong>tRPC Success!</strong></p>
          <p>{secretQuery.data.message}</p>
        </div>
      )}
    </div>
  );
}