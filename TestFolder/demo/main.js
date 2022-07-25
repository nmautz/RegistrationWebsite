function generate() {
  var tasks = [
    {
      startTime: 0,
      duration: 0.1,
      column: 1,
      id: Math.ceil(Math.random() * 100000),
      title: 'HHHHHHHHHHHH'
    },
    {
      startTime: 1.5,
      duration: 1,
      column: 0,
      id: Math.ceil(Math.random() * 100000),
      title: 'HHHHHHHHHHHH'
    },
    {
      startTime: 1.5,
      duration: 1,
      column: 2,
      id: Math.ceil(Math.random() * 100000),
      title: 'HHHHHHHHHHHH'
    }
  ];

  console.log("tasks count: " + tasks.length);

  $("#skeduler-container").skeduler({
    headers: ["Specialist 1", "Specialist 2", "Specialist 3"],
    tasks: tasks,
    cardTemplate: '<div>${id}</div><div>${title}</div>',
    onClick: function (e, t) { console.log(e, t); }
  });
}