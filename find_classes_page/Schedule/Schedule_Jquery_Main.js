function generate(tasks) {
    // var tasks = [
    //   {
    //     startTime: 0,
    //     duration: 0.1,
    //     column: 1,
    //     id: Math.ceil(Math.random() * 100000),
    //     title: 'Hello'
    //   },
    //   {
    //     startTime: 1.5,
    //     duration: 1,
    //     column: 0,
    //     id: Math.ceil(Math.random() * 100000),
    //     title: 'Nathan'
    //   },
    //   {
    //     startTime: 1.5,
    //     duration: 1,
    //     column: 2,
    //     id: Math.ceil(Math.random() * 100000),
    //     title: ':)'
    //   }
    // ];
  
    console.log("tasks count: " + tasks.length);
  
    $("#skeduler-container").skeduler({
      headers: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      tasks: tasks,
      cardTemplate: '<div>${id}</div><div>${title}</div>',
      onClick: function (e, t) { console.log(e, t); }
    });
  }