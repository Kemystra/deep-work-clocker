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