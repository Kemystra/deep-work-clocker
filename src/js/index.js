import "../scss/master.scss"

Parse.initialize(
    "c2CLmzJBHw8cPD6gvehLa5FwUjuCgHtBxWiUhU25", // App. ID
    "LdSZCyRhg7nn7rYNw8c5TylpOHaxeF5uqYgjeLtT" // JS key
);

Parse.serverURL = "https://parseapi.back4app.com/";

document.getElementById("login-form").onsubmit = async e => {
    e.preventDefault();

    let username = e.target["0"].value;
    let passwd = e.target["1"].value;

    try {
        let user = await Parse.User.logIn(username, passwd);
        console.log("Logged in!");
        console.table(user);
    } catch (error) {        
        console.error(error);
    }
}