export default function Home() {
  return (
    <main style={{ padding: "4rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>Welcome to Nudge</h1>
      <p style={{ marginTop: "1rem", color: "green" }}>
        ✅ Backend, Database, and Auth are successfully connected!
      </p>
      
      <div style={{ marginTop: "2rem" }}>
        <a 
          href="/test-auth" 
          style={{ 
            padding: "10px 20px", 
            background: "#0070f3", 
            color: "white", 
            textDecoration: "none", 
            borderRadius: "5px" 
          }}
        >
          Go to the Auth Test Page
        </a>
      </div>
    </main>
  );
}