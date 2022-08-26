function create_plan(planID){

  localStorage.setItem(planID, "planID")
 

}


function delete_plan(planID){
  //remove plan from plans list
  localStorage.removeItem(planID)


  //remove all classes with matching planID
  saved_classes = load_classes()

  for (var i = 0;  i < saved_classes.length; ++i){
    if(saved_classes[i].planID == planID){
      localStorage.removeItem(saved_classes[i].uniqueID)
    }
  }

}

function get_plan_IDs(){
  var keys = Object.keys(localStorage)

  var ids = []

  for(var i = 0; i < keys.length; ++i){
    value = localStorage.getItem(keys[i])
    if(value == "planID"){
      ids.push(keys[i])
    }

  }

  return ids
}



var classColor = ["#8d0d99", "#99470d", "#19990d", "#0d5f99","#971212","#559712", "#129797", "#551297","#4b9712", "#128e97", "#5e1297", "#971b12"]
var colorInd = 0

function getNewColor(planID)
{
  var classes = load_classes(planID)
  var color = classColor[colorInd % classColor.length]
  var foundColor = true
  for (var i = 0; i < classColor.length; ++i)
  {
    if(is_color_taken(classes,color))
    {
      colorInd++
      color = classColor[colorInd % classColor.length]
      foundColor = false
    }else
    {
      foundColor = true
      break
    }
  }
  if (!foundColor)
  {
    colorInd++
    return classColor[colorInd % classColor.length]
  }
    
  colorInd++
  return color
}

function is_color_taken(classes,color)
{
  for (var i = 0; i < classes.length; ++i)
  {
    if (classes[i].color == color)
      return true
  }
  return false
}

function check_for_contradictions(planID, section)
{
  var week_days = [section.sunday[0], section.monday[0], section.tuesday[0], section.wednesday[0], section.thursday[0], section.friday[0], section.saturday[0]]
  var classes = load_classes(planID)
  for (var i = 0; i < classes.length; ++i)
  {
    var weekDays =  [classes[i].sunday[0], classes[i].monday[0], classes[i].tuesday[0], classes[i].wednesday[0], classes[i].thursday[0], classes[i].friday[0], classes[i].saturday[0]]
    for (var j = 0; j < week_days.length; ++j)
    {
      if (week_days[j] && weekDays[j])
      {
        // console.log(classes[i].beginTime,section.beginTime)
        if (do_classes_overlap(section,classes[i]))
        {
          section.color="red"
          section.overlaps = true
          return
        }
      }
    }
  }
  section.color = getNewColor()
  section.overlaps = false
}

function do_classes_overlap(section1,section2)
{
  if (section1.beginTime[0] <= section2.endTime[0] && section1.endTime[0] >= section2.endTime[0])
    return true
  if (section2.beginTime[0] <= section1.endTime[0] && section2.endTime[0] >= section1.endTime[0])
    return true
  return false
}

function save_class(planID, section){

  check_for_contradictions(planID,section)
  section.planID = planID;
  section.uniqueID = planID+section.id;
  localStorage.setItem(section.uniqueID, JSON.stringify(section))
}

function get_class(planID, courseID)
{
  var classes = load_classes(planID)
  for (var i = 0; i < classes.length; ++i)
  {
    if (classes[i].id == courseID)
      return classes[i]
  }
  console.log("error: no class found")
  return null
}

function remove_class_by_ID(planID, id){
  var uniqueID = planID + id;
  localStorage.removeItem(uniqueID)
  var classes = load_classes(planID)
  var tempStack = []
  for (var i = 0; i < classes.length; ++i)
  {
    if (classes[i].color == "red")
    {
      tempStack.push(classes[i])
      uniqueID = planID + classes[i].id
      localStorage.removeItem(uniqueID)
    }    
  }
  for (var i = 0; i < tempStack.length; ++i)
    save_class(planID,tempStack[i])

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


function clearEmptySchedule()
{

}

document.addEventListener("DOMContentLoaded", function(){
  delete_plan("(None)")




  

})