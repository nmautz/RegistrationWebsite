function create_plan(planID){
  localStorage.setItem(planID, "planID")
}

function create_plan_wrapper()
{
  let planID = document.getElementById("input_plan_popUp").value
  let planString = getAvailablePlan(planID);
  if (planString != null)
  {
    create_plan(planString);
    Calendar.getInstance().setCurrentPlanID(planString);
    const plan_select_div = document.getElementById("plan-select");
    updatePlanDropdown(plan_select_div);
    update_section_display()
    const input = plan_select_div.childNodes[1];
    input.value = "Plan: " + Calendar.getInstance().getCurrentPlanID() + " \u25BC";
    close_plan_popUp()
  }else
    alert("Plan Already Created")
}

function getAvailablePlan(planID)
{
  if(planID == "")
  {
      var charCode = 65
      var planName = "A"
      while(is_plan_saved(planName))
      {
        charCode++
        planName = String.fromCharCode(charCode)
      }
      return planName;
  }else
  {
    if (is_plan_saved(planID))
      return null;
    else
      return planID;
  }
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

//deletes the current plan, sets plan to default plan
function delete_plan_wrapper()
{
  let calendar = Calendar.getInstance();
  let planID = calendar.getCurrentPlanID()
  let enteredVal = prompt("Enter '" + planID + "' to delete plan: " + planID)
  if (enteredVal == planID)
  {
    delete_plan(planID)
    let calendar = Calendar.getInstance()
    //setting current plan to default plan
    let defaultPlan = calendar.getDefaultPlan()
    if(!get_plan_IDs().includes(defaultPlan))
    {
      create_plan(defaultPlan)
      calendar.setCurrentPlanID(defaultPlan)
    }
    //setting current plan
    calendar.setCurrentPlanID(defaultPlan)
    // setting plan dropdown
    const plan_select_div = document.getElementById("plan-select");
    updatePlanDropdown(plan_select_div);
    const input = plan_select_div.childNodes[1];
    input.value = "Plan: " + calendar.getCurrentPlanID() + " \u25BC";
    update_section_display()
    calendar.update_calendar()
  }else
    alert("Error: Input does not match Plan Name");
   

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

//checks if a section overlaps with a current section in plan
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
          return classes[i]
        }
      }
    }
  }
  return null
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

  section.color = getNewColor()
  section.planID = planID;
  section.uniqueID = planID+section.id;
  var overLappingClass = check_for_contradictions(planID,section)
  if (overLappingClass == null){
    localStorage.setItem(section.uniqueID, JSON.stringify(section))
    Calendar.getInstance().update_calendar();
  }
  else
    alert("Error: section overlaps with '" + overLappingClass.courseTitle + "', ID: " + overLappingClass.id)


}

function get_class(planID, courseID)
{
  var classes = load_classes(planID)
  for (var i = 0; i < classes.length; ++i)
  {
    if (classes[i].id == courseID)
      return classes[i]
  }
  console.error("error: no class found")
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

  Calendar.getInstance().update_calendar();
  

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
  try{
    classes = load_classes(Calendar.getInstance().getCurrentPlanID())
    for(var i = 0; i < classes.length; ++i){
      if(classes[i].id == section.id)
      {
        return true
      }
  
    }
  }catch(e){
    console.error(e)
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


/** @deprecated */ // use get_plan_IDs()
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