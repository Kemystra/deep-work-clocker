import "../scss/master.scss"

// Constants
import { DEEP_HOUR_CLASS, APP_ID, JS_KEY } from "./constants.js";

// Login system
import { normalLogin, sessionTokenLogin } from "./login.js";
import { hideLoginPanel } from "./hide_login.js";

Parse.initialize(APP_ID, JS_KEY);

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