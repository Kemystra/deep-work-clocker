export async function normalLogin() {
    e.preventDefault();

    let username = e.target["0"].value;
    let passwd = e.target["1"].value;

    try {
        let user = await Parse.User.logIn(username, passwd);
        console.log("Logged in!");
        console.table(user);

        // Save user's token to cookie
        hideLoginPanel();

    } catch (error) {        
        console.error(error);
    }
}