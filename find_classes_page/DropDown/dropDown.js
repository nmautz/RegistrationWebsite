fetch("../classes.json").then(response => response.json()).then( function(jsonData){
    classesList = jsonData["data"]
  })

  