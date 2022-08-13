    function generate(tasks) {


    // console.log("tasks count: " + tasks.length);

    $("#skeduler-container").skeduler({
        headers: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        tasks: tasks,
        cardTemplate: '<div>${id}</div><div>${title}</div>',
        onClick: function (e, t) { console.log(e, t); }
    });
    }

