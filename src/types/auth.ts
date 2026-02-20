/*
GENERAL PURPOSE:

Interfaces for user authentication and profile data.

User interface maps to the profiles table in Supabase.
Fields include name, username (unique), email (unique), 
university (optional, derived from .edu email), and auth status.

authenticated: true -> email is verified & .edu, user can access duo mode
             : false -> email is not verified, user limited to solo mode

Non .edu users can still sign up and use solo mode.

AuthState tracks whether the app is loading and whether
a user is currently logged in.

If these fields change please tell me (polter) beforehand!
*/


/*
    loading: if a sate is loading nothing should be processed at this gien time
    user? if a user is logged in then they'll have access to their user interface
        this allows for peoptle to browse the site without having an account   

    if these fields change please tell me (polter) before hand!
*/
export interface AuthState {
    loading: boolean;
    user?: User;
}

/*
refer to authenticated about to see what the bool does, the rest 
is self-explanatory
*/
export interface User {
    firstName: string; 
    lastName: string;
    userName: string; //this has to be somehow unique
    email: string; // this also has to be unique & changeable
    authenticated: boolean; 
    university?: string; //gotten from .edu email
    userID: string;
    createdAt: string; // first created
    updatedAt: string; //last time a profile was 
}