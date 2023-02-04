import "../scss/master.scss"

Parse.initialize(
    "c2CLmzJBHw8cPD6gvehLa5FwUjuCgHtBxWiUhU25", // App. ID
    "LdSZCyRhg7nn7rYNw8c5TylpOHaxeF5uqYgjeLtT" // JS key
);

Parse.serverURL = "https://parseapi.back4app.com/";

window.onload = () => {


    // Hide login panel if token is retrieved and valid
    if(Parse.User.current()) {
        hideLoginPanel();
    }
}

document.getElementById("login-form").onsubmit = async e => {
    
}

document.getElementById("get-today").onclick = getTodayObject;

async function getTodayObject() {
    const query = new Parse.Query("DeepHour");

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

    if(todayObjectArr === []) {
        console.log("obj is empty");
    }
    else {
        try {
            const query = new Parse.Query("DeepHour");
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

function hideLoginPanel() {
    document.getElementById("login-panel").classList.add("hide");
}