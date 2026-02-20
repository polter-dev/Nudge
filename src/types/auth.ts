/*
GENERAL PURPOSE:

Create an interface for a user
    in the interface create a variable for the following:
    firstName, lastName, email, autheticated (bool)
        authenticated: true -> email is verified & .edu
                     : false -> email is not verified or not a edu
                     ideally in this scenario, if the email is not an edu, users can not sign up
    we can maybe think about allowing solo for non student users who want to utilize this for other scenarios



    the rest is field is self explanatory.
    ill provide the interface below

    ensure that the email during signup is a .edu email

*/


/*
    loading: if a state is loading nothing should be processed at this gien time
    user? if a user is logged in then they'll have access to their user interface
        this allows for people to browse the site without having an account   

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
    email: string;
    authenticated: boolean;
}