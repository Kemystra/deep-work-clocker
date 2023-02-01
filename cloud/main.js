
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", (request) => {
	return "Hello world!";
});

Parse.Cloud.define("add_hours", async request => {
	const query = new Parse.Query("DeepHour");

	// Get only the object with that were created today
	// Setting the hours right at midnight
	query.greaterThan((new Date()).setHours(0,0,0,0));

	try {
		let result = await query.find();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
});