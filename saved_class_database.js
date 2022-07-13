function save_class(planID, section){

  section.planID = planID;
  section.uniqueID = planID+section.id;
  localStorage.setItem(section.uniqueID, JSON.stringify(section))
}

function remove_class_by_ID(planID, id){
  const uniqueID = planID + id;
  localStorage.removeItem(uniqueID)
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


})