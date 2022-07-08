
class class_search_query{

  constructor(){

    
    this.subjectDescription
    this.courseNumber
    this.courseTitle
    this.professorName
    this.attributeDesc
    this.subject
    //special case for days, as there is no json 'days' element in data
    this.days = ""
    this.requirementArr = [this.subject, this.subjectDescription, this.courseNumber, this.courseTitle,this.professorName,this.attributeDesc,this.subject]
    //sets vars
    for (var i = 0; i < this.requirementArr.length; ++i)
      this.requirementArr[i] = ""
  }

  

  addQueryRequirement(data,elementNum)
  {
    if(elementNum == -1)
      this.days = data
    else
      this.requirementArr[elementNum] = data
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
    var meetDays = this.getWeekString(section)
    var temp = meetDays.toUpperCase()
    if(temp == String(this.days).toUpperCase() || this.days == "")
      return true
    return false
  }

  //for special inherited week dropdown
  containsWeek(section,userInput)
  {
    var meetDays = this.getWeekString(section)
    var temp = meetDays.toUpperCase()
    if(temp.includes(String(this.days).toUpperCase()) || this.days == undefined)
      return true
    return false
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
    var validArray = []
    if(elementNum == -1)
    {
      validArray.push(this.getWeekString(classList))
      return validArray
    }
    var classListArr = [classList.subject,classList.subjectDescription,classList.courseNumber,classList.courseTitle,classList.professorName,classList.attributeDesc]
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
  
  getWeekString(section)
  {
    var week_days = [section.sunday, section.monday, section.tuesday, section.wednesday, section.thursday, section.friday, section.saturday]
    var meetDays = ""
    var key = []
    for (var i = 0; i < week_days.length; ++i)
    {
      if(week_days[i][0])
        key.push(i)
      else
        meetDays = this.clearStack(key,meetDays)
    }
    meetDays = this.clearStack(key,meetDays)
        
    return meetDays
  }

  clearStack(key,meetDays)
  {
    var weekDayTitles = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var sWeekDayTitles = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    if(key.length > 2)
        {
          //reversing stack
          var last = sWeekDayTitles[key.pop()]
          while(key.length > 1)
            key.pop()
          var first = sWeekDayTitles[key.pop()]
          if(meetDays != "")
            meetDays += ","
          meetDays = String(meetDays + " " + first + "-" + last)
        }else if(key.length > 0)
        {
          key.reverse()
          while(key.length > 0)
          {
            if(meetDays != "")
              meetDays += ","
            meetDays = String(meetDays + " " + weekDayTitles[key.pop()])
          }
            
        }
    return meetDays
  }

  isEmpty()
  {
    for (var i = 0; i < this.requirementArr.length; ++i)
    {
      if(this.requirementArr[i] != undefined && this.requirementArr[i] != '')
        return false
    } 
    if (this.days != "")
      return false
    return true
  }
}


