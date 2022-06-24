function save_class(section){
  localStorage.setItem(section.id, JSON.stringify(section))
}

function remove_class_by_ID(id){
  localStorage.removeItem(id)
}

function load_classes(){
  keys = Object.keys(localStorage)
  values = []

  for(var i = 0; i < keys.length; ++i)
  {
    //Item at key might not be a class
    try{
      values.push(JSON.parse(localStorage.getItem(keys[i])))
    }catch{
      //Delete unwanted key
      localStorage.removeItem(keys[i])

    }

  }
  return values

  
}

function is_class_saved(section){
  classes = load_classes()
  for(var i = 0; i < classes.length; ++i){
    if(classes[i].id == section.id)
    {
      return true
    }

  }
  return false
}
