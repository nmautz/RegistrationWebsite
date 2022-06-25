
class class_search_query{

  constructor(){

    this.subject
    this.subjectDescription 
    this.courseNumber 
    this.courseTitle
    //weekDays holds the week array
    this.setWeekDays()
    // this.requirementArr = []
    this.requirementArr = [this.subject, this.subjectDescription, this.courseNumber, this.courseTitle]
  }

  setWeekDays()
  {
    for (var i = 0; i < 7; ++i)
      this.weekDays.push(false)
  }

  addQueryRequirement(data,elementNum)
  {
    for (var i = 0; i < this.requirementArr.length; ++i)
    {
      if (i == elementNum)
        this.requirementArr[i] = data
    }
  }

  meetsRequirements(classList)
  {
    var classListArr = [classList.subject,classList.subjectDescription,classList.courseNumber,classList.courseTitle]
    
    for(var i = 0; i < this.requirementArr.length; ++i)
    {
      if(!this.checkRequirement(this.requirementArr[i],classListArr[i]))
        return false;
    }
    return true
  }

  checkRequirement(req,base)
  {
    var temp = String(base).toUpperCase()
    if(!temp.includes(String(req)) && req != undefined)
      return false
    return true
  }

  getClassesListString(classList, elementNum)
  {
      switch(elementNum)
      {
        case 0:
          return String(classList.subject)
          break
        case 1:
          return String(classList.subjectDescription)
          break
        case 2:
          return String(classList.courseNumber)
          break
        case 3:
          return String(classList.courseTitle)
          break          
      }
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


