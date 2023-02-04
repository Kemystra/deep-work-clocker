import { hideLoginPanel } from "./hide_login.js";

export async function normalLogin(e) {
    e.preventDefault();

    // Get the credentials from the elements
    let username = e.target["0"].value;
    let passwd = e.target["1"].value;

    try {
        // Set the HTTP method to POST to hide from URL search bar
        let user = await Parse.User.logIn(username, passwd, {
            method: 'POST'
        });
        console.log("Logged in!");
        console.table(user);

        // Save user's token to cookie
        let sessionToken = user.getSessionToken();
        console.log(user.createdAt);
        document.cookie = `SameSite=strict;expires=${user.createdAt.toUTCString()};userToken=${sessionToken}`

        // Hide panel after finished
        hideLoginPanel();

    } catch (error) {        
        console.error(error);
    }
}

export async function sessionTokenLogin(token) {
    try {
        const user = await Parse.User.become(token);
        console.log("Logged in with the previous session token");
    } catch (error) {
        console.error(error);
        console.log("Error on using previous session token");
    }
}