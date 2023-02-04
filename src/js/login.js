import { hideLoginPanel } from "./hide_login.js";

export async function normalLogin() {
    e.preventDefault();

    // Get the credentials from the elements
    let username = e.target["0"].value;
    let passwd = e.target["1"].value;

    try {
        let user = await Parse.User.logIn(username, passwd);
        console.log("Logged in!");
        console.table(user);

        // Save user's token to cookie
        let sessionToken = Parse.Session.getSessionToken();
        console.log(Parse.Session.createdAt);
        document.cookie = `SameSite=strict;expires=${Parse.Session.createdAt.toUTCString()};userToken=${sessionToken}`

        // Hide panel after finished
        hideLoginPanel();

    } catch (error) {        
        console.error(error);
    }
}

export async function sessionTokenLogin(token) {
    try {
        const user = await Parse.User.become(token);
    } catch (error) {
        console.error(error);
    }
}