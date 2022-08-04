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
  var classes = load_classes(planID)
  var week_days = [section.sunday, section.monday, section.tuesday, section.wednesday, section.thursday, section.friday, section.saturday]
  for (var i = 0; i < classes.length; ++i)
  {
    var weekDays =  [classes[i].sunday, classes[i].monday, classes[i].tuesday, classes[i].wednesday, classes[i].thursday, classes[i].friday, classes[i].saturday]
    for (var j = 0; j < week_days.length; ++j)
    {
      if (week_days[j] && weekDays[j])
      {
        console.log(classes[i].beginTime,section.beginTime)
        if (do_classes_overlap(section,classes[i]))
        {
          section.color="red"
          classes[i].color="red"
        }
      }
    }
  }
}

function do_classes_overlap(section1,section2)
{
  if (section1.beginTime[0] < section2.endTime[0] && section1.endTime[0] > section2.endTime[0])
    return true
  if (section2.beginTime[0] < section1.endTime[0] && section2.endTime[0] > section1.endTime[0])
    return true
  return false
}

function save_class(planID, section){

  section.color = getNewColor();
  // check_for_contradictions(planID,section)
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