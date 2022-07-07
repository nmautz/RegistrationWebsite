function save_class(planID, section){
  section.planID = planID;
  localStorage.setItem(section.id, JSON.stringify(section))
}

function remove_class_by_ID(planID, id){
  localStorage.removeItem(planID, id)
}

function load_classes(planID){
  keys = Object.keys(localStorage)
  values = []

  for(var i = 0; i < keys.length; ++i)
  {
    //Item at key might not be a class
    try{

      const section = JSON.parse(localStorage.getItem(keys[i]));
      if(section.planID == planID || planID == "" || planID == undefined){
        values.push(section)
      }
      
    }catch{
      //Delete unwanted key
      localStorage.removeItem(keys[i])

    }

  }
  return values

  
}

function is_class_saved(section){
  const planID_input = document.getElementById("planID-input");
  classes = load_classes(planID_input.value)
  for(var i = 0; i < classes.length; ++i){
    if(classes[i].id == section.id)
    {
      return true
    }

  }
  return false
}

function load_planIDs(){
  var planIDs = [];
  var saved_classes = load_classes();
  for(var i = 0; i < saved_classes.length; ++i){
    if( !planIDs.includes( saved_classes[i].planID )){
      planIDs.push(saved_classes[i].planID);
    }


  }
  return planIDs;

}


document.addEventListener("DOMContentLoaded", function(){
  const ids = load_planIDs()

  console.log("---------")
  console.log("Plan IDS")
  for ( var i = 0; i < ids.length; ++i ){
    console.log(ids[i])
  }
  console.log("---------")



})