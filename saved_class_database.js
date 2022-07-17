function create_plan(planID){

  plans = localStorage.getItem("planIDs")
  
  if(plans == null){
    plans = JSON.parse('{}')
    plans["ids"] = []
    plans = JSON.stringify(plans)
  }

  plans = JSON.parse(plans)
  plans["ids"].push(planID)

  plans = JSON.stringify(plans)
  localStorage.setItem("planIDs", plans)
 

}

function delete_plan(planID){
  //remove plan from plans list
  planIDs = get_plan_IDs()
  if(Array.isArray(planIDs)){
    planIDs.removeItem(planID)
  }


  //remove all classes with matching planID
  saved_classes = load_classes()

  for (var i = 0;  i < saved_classes.length; ++i){
    if(saved_classes[i].planID == planID){
      localStorage.removeItem(saved_classes[i].uniqueID)
    }
  }

}

function get_plan_IDs(){
  planIDs = localStorage.getItem("planIDs")
  if(planIDs != null){
    planIDs = JSON.parse(planIDs)
    return planIDs["ids"]
  }
  return null
}




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
  classes = load_classes(schedule.selectedPlan)
  for(var i = 0; i < classes.length; ++i){
    if(classes[i].id == section.id)
    {
      return true
    }

  }
  return false
}

function is_plan_saved(planID)
{
  const ids = get_plan_IDs()
  if(ids == null){
    return false
  }
  for (var i = 0; i < ids.length; ++i)
  {
      if (ids[i] == planID)
        return true
  }
  return false
}


/** @deprecated */ 
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
  



  

})