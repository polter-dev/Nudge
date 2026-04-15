import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
      authenticated: boolean;
      university: string | null;
      image?: string | null;
    };
  }
}
