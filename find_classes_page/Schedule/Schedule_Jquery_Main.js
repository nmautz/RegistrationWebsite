    function generate(tasks) {


    // console.log("tasks count: " + tasks.length);

    $("#skeduler-container").skeduler({
        headers: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        tasks: tasks,
        cardTemplate: '<div>${id}</div><div>${title}</div>',
        onClick: function (e, t)
        {
            var section = get_class(schedule.selectedPlan,t.id)
            open_pop_up(section)
        }
    });
    }

