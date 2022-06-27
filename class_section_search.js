
class class_search_query{

  constructor(){

    this.subject
    this.subjectDescription
    this.courseNumber
    this.courseTitle
    this.attributeDesc
    this.professorName
    //weekDays holds the week array
    this.requirementArr = [this.subject, this.subjectDescription, this.courseNumber, this.courseTitle,this.attributeDesc,this.professorName]
    this.setVars()
  }

  setVars()
  {
    for (var i = 0; i < this.requirementArr.length; ++i)
    {
      this.requirementArr[i] = ""
    }
  }
  

  addQueryRequirement(data,elementNum)
  {
    this.requirementArr[elementNum] = data
  }


  meetsRequirements(classList)
  {
    var classListArr = [classList.subject,classList.subjectDescription,classList.courseNumber,classList.courseTitle,classList.attributeDesc,classList.professorName]
    for(var i = 0; i < this.requirementArr.length; ++i)
    {
      if(!this.checkRequirement(this.requirementArr[i],classListArr[i]))
        return false;
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
        {
          return true
        }
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

    var classListArr = [classList.subject,classList.subjectDescription,classList.courseNumber,classList.courseTitle,classList.attributeDesc,classList.professorName]
  
    var validArray = []
    var val = classListArr[elementNum]
    if (Array.isArray(val) )
    { 
      for(var i = 0; i < val.length; ++i)
      {
        var temp = String(val[i]).toUpperCase()
        if(temp.includes(this.requirementArr[elementNum]) || this.requirementArr[elementNum] == '')  
        {
          validArray.push(val[i])
        }
      }
    }else
    {
       validArray.push(classListArr[elementNum])
      //  return classListArr[elementNum]
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


