function save_class(planID, section){
  section.planID = planID;
  console.log(section)
  console.log(planID)
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
      if(section.planID == planID){
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

