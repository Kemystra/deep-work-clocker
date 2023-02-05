import "../scss/master.scss"

// Constants
import { DEEP_HOUR_CLASS } from "./constants.js";

// Login system
import { normalLogin, sessionTokenLogin } from "./login.js";
import { hideLoginPanel } from "./hide_login.js";

Parse.initialize(
    "c2CLmzJBHw8cPD6gvehLa5FwUjuCgHtBxWiUhU25", // App. ID
    "LdSZCyRhg7nn7rYNw8c5TylpOHaxeF5uqYgjeLtT" // JS key
);

Parse.serverURL = "https://parseapi.back4app.com/";

window.onload = () => {
    // Retrieve from cookie first
    let sessionToken;
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("userToken=")) {
            // Get the value part (damn ChatGPT)
            sessionToken = cookie.substring("userToken=".length, cookie.length);
        }
    }

    // Use the function to 'become' the user
    sessionTokenLogin(sessionToken).then(() => {
        // Hide login panel if token is retrieved and valid
        if(Parse.User.current()) {
            hideLoginPanel();
        }
    })
}

// Listen for login events
document.getElementById("login-form").onsubmit = normalLogin;

document.getElementById("get-today").onclick = getTodayObject;

async function getTodayObject() {
    const query = new Parse.Query(DEEP_HOUR_CLASS);

	// Get only the object with that were created today
    let todayDate = new Date();
    // Set the hours to midnight
    // So that any work registered after that will be displayed
    todayDate.setHours(0,0,0,0);
	query.greaterThan('createdAt', todayDate);

	try {
		let result = await query.find();
		console.log(result);
        return result;
	} catch (error) {
		console.error(error);
        return [];
	}
}

async function addHours() {
    const todayObjectArr = await getTodayObject();

    if(todayObjectArr.length === 0) {
        console.log("obj is empty");

        // Create new Parse Object
        const newTodayObject = new Parse.Object(DEEP_HOUR_CLASS);
    }
    else {
        try {
            const query = new Parse.Query(DEEP_HOUR_CLASS);

            // There should only be one object per day
            let todayObject = await todayObjectArr[0];
            const object = await query.get(todayObject.id);
            object.set("total", 20);

            try {
                const resp = await object.save();
                console.log("Updated!")
                console.log(resp);
            } catch (error) {
                console.error("Error in updating ", error);
            }
        } catch (error) {
            console.error("Error while retrieving ", error);
        }
    }
}

document.getElementById("add-hours").onclick = addHours;