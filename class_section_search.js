
class class_search_query{

  constructor(){

    this.subject
    this.subjectDescription
    this.courseNumber
    this.courseTitle
    this.professorName
    this.attributeDesc
    //weekDays holds the week array
    this.weekDays = []
    this.requirementArr = [this.subject, this.subjectDescription, this.courseNumber, this.courseTitle,this.professorName,this.attributeDesc]
    this.setVars()
    

  }

  setVars()
  {
    for (var i = 0; i < this.requirementArr.length; ++i)
      this.requirementArr[i] = ""
    
    //weekdays is an array and needs to be set separate
    for (var i = 0; i < 7; ++i)
      this.weekDays.push(false)
  }
  

  addQueryRequirement(data,elementNum)
  {
    this.requirementArr[elementNum] = data
  }

  //specifically called by the checkboxes onClick
  addQueryRequirementDays(dayNum)
  {
    this.weekDays[dayNum] = !this.weekDays[dayNum]
  }


  meetsRequirements(classList)
  {
    var classListArr = [classList.subject,classList.subjectDescription,classList.courseNumber,classList.courseTitle,classList.professorName,classList.attributeDesc]
    if(!this.meetsWeekReq(classList))
      return false

    for(var i = 0; i < this.requirementArr.length; ++i)
    {
      if(!this.checkRequirement(this.requirementArr[i],classListArr[i]))
        return false;
    }
    return true
  }

  meetsWeekReq(section)
  {
    var week_days = [section.sunday, section.monday, section.tuesday, section.wednesday, section.thursday, section.friday, section.saturday]
    for (var i = 0; i < week_days.length; ++i)
    {
      if (this.weekDays[i] != week_days[i][0])
        return false
    }
    return true
  }

  checkRequirement(req,classItem)
  {

    if(Array.isArray(classItem) && classItem.length > 1)
    {
      for(var i = 0; i < classItem.length; ++i)
      {
        var temp = String(classItem[i]).toUpperCase()
        if(temp.includes(String(req)) || req == '')
          return true
      }
      return false
      
    }else{
      var temp = String(classItem).toUpperCase()
      if(!temp.includes(String(req)) && req != '')
        return false
      return true
  
    }
  }

  getClassesListString(classList, elementNum)
  {
    var classListArr = [classList.subject,classList.subjectDescription,classList.courseNumber,classList.courseTitle,classList.professorName,classList.attributeDesc]
  
    var validArray = []
    var val = classListArr[elementNum]
    if (Array.isArray(val) )
    { 
      for(var i = 0; i < val.length; ++i)
      {
        var temp = String(val[i]).toUpperCase()
        if(temp.includes(this.requirementArr[elementNum]) || this.requirementArr[elementNum] == '')          
          validArray.push(val[i])        
      }
    }else
    {
       validArray.push(classListArr[elementNum])
    }
    return validArray
  }

  isEmpty()
  {
    var isEmpty = true
    for (var i = 0; i < this.requirementArr.length; ++i)
    {
      if(this.requirementArr[i] != undefined && this.requirementArr[i] != '')
        isEmpty = false
    } 
    return isEmpty
  }
}


