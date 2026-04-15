"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { api } from "~/trpc/react";

interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  authenticated: boolean;
  university: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  loginWithMicrosoft: () => Promise<void>;
  loginWithDemo: (opts: {
    email: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    university?: string;
  }) => void;
  logout: () => Promise<void>;
}

const DEMO_USER_KEY = "nudge_demo_user";

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  loginWithMicrosoft: async () => {},
  loginWithDemo: () => {},
  logout: async () => {},
});

const SIGNUP_STORAGE_KEY = "nudge_signup_data";

interface SignupData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}

function ProfileCompletionHandler({ email }: { email: string }) {
  const updateProfile = api.auth.updateProfile.useMutation();
  const appliedRef = useRef(false);

  useEffect(() => {
    if (appliedRef.current) return;

    const raw = localStorage.getItem(SIGNUP_STORAGE_KEY);
    if (!raw) return;

    let data: SignupData;
    try {
      data = JSON.parse(raw) as SignupData;
    } catch {
      localStorage.removeItem(SIGNUP_STORAGE_KEY);
      return;
    }

    appliedRef.current = true;
    localStorage.removeItem(SIGNUP_STORAGE_KEY);

    updateProfile.mutate(
      { email, userName: data.userName },
      {
        onSettled: () => {
          // Force a full reload so NextAuth re-fetches the session with the
          // updated userName from the database.
          window.location.reload();
        },
      },
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return null;
}

function buildDemoUser(email: string, overrides: Partial<AuthUser> = {}): AuthUser {
  const [localPart] = email.split("@");
  const base = (localPart ?? "student").replace(/[^a-zA-Z0-9]/g, "");
  const firstName = overrides.firstName ?? base.charAt(0).toUpperCase() + base.slice(1, 6);
  const lastName = overrides.lastName ?? "Demo";
  const rawUser = overrides.userName ?? base.toLowerCase();
  // Ensure userName meets validation rules (min 5, starts with letter, alphanumeric)
  const safeUser = /^[a-zA-Z][a-zA-Z0-9]{4,}$/.test(rawUser)
    ? rawUser
    : `user${base.toLowerCase().slice(0, 8).padEnd(4, "0")}`;
  return {
    id: `demo-${email}`,
    firstName,
    lastName,
    userName: safeUser,
    email,
    authenticated: email.toLowerCase().endsWith(".edu"),
    university: overrides.university ?? "Demo University",
    ...overrides,
  };
}

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  // Demo user stored in localStorage for presentations / no-credential mode
  const [demoUser, setDemoUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(DEMO_USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const sessionUser: AuthUser | null = session?.user
    ? {
        id: session.user.id,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        userName: session.user.userName,
        email: session.user.email,
        authenticated: session.user.authenticated,
        university: session.user.university,
      }
    : null;

  // Real session takes priority over demo
  const user = sessionUser ?? demoUser;

  const loginWithMicrosoft = async () => {
    await signIn("azure-ad", { callbackUrl: "/dashboard" });
  };

  const loginWithDemo = (opts: {
    email: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    university?: string;
  }) => {
    const fake = buildDemoUser(opts.email, opts);
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(fake));
    setDemoUser(fake);
  };

  const logout = async () => {
    localStorage.removeItem(DEMO_USER_KEY);
    setDemoUser(null);
    if (session) {
      await signOut({ callbackUrl: "/" });
    }
  };

  const loading = status === "loading";

  const value = useMemo(
    () => ({ user, loading, loginWithMicrosoft, loginWithDemo, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {/* Apply pending signup form data (username) after first real OAuth login */}
      {status === "authenticated" && sessionUser?.email && (
        <ProfileCompletionHandler email={sessionUser.email} />
      )}
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
