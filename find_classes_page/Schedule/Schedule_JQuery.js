var tasks = [
    // {
    //   startTime: startTime1,
    //   duration: duration1,
    //   column: 1,
    //   id: 1,
    //   title: 'title 1'
    // },
    // {
    //   startTime: startTime2,
    //   duration: duration2,
    //   column: 2,
    //   id: 2,
    //   title: 'title 2'
    // },
    // {
    //   startTime: startTime3,
    //   duration: duration3,
    //   column: 3,
    //   id: 3,
    //   title: 'title 3'
    // },
   
];

$("#skeduler-container").skeduler({
    headers: ["Specialist 1", "Specialist 2", "Specialist 3"],
    tasks: tasks,
    cardTemplate: '<div>${id}</div><div>${title}</div>'
  });

$("#skeduler-container").skeduler({

  // String[] - Array of column headers
  headers: [],  

  // Task[] - Array of tasks. Required fields: 
  // id: number, startTime: number, duration: number, column: number
  tasks: [],    

  // Card template - Inner content of task card. 
  // You're able to use ${key} inside template, where key is any property from task.
  cardTemplate: '<div>${id}</div>',

  // OnClick event handler
  onClick: function (e, task) {},

  // Css classes
  containerCssClass: 'skeduler-container',
  headerContainerCssClass: 'skeduler-headers',
  schedulerContainerCssClass: 'skeduler-main',
  taskPlaceholderCssClass: 'skeduler-task-placeholder',
  cellCssClass: 'skeduler-cell',

  // height of one half-hour line in <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a>
  lineHeight: 30,      

  // width of board of grid cell
  borderWidth: 1,      

  // debug mode
  debug: false
  
});

$("#skeduler-container").skeduler({

    // String[] - Array of column headers
    headers: [],  
  
    // Task[] - Array of tasks. Required fields: 
    // id: number, startTime: number, duration: number, column: number
    tasks: [],    
  
    // Card template - Inner content of task card. 
    // You're able to use ${key} inside template, where key is any property from task.
    cardTemplate: '<div>${id}</div>',
  
    // OnClick event handler
    onClick: function (e, task) {},
  
    // Css classes
    containerCssClass: 'skeduler-container',
    headerContainerCssClass: 'skeduler-headers',
    schedulerContainerCssClass: 'skeduler-main',
    taskPlaceholderCssClass: 'skeduler-task-placeholder',
    cellCssClass: 'skeduler-cell',
  
    // height of one half-hour line in <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a>
    lineHeight: 30,      
  
    // width of board of grid cell
    borderWidth: 1,      
  
    // debug mode
    debug: false
    
  });
