
class class_search_query{

  constructor(){

    this.subject
    this.subjectDescription
    this.courseNumber
    this.courseTitle
    this.attributeDesc
    //weekDays holds the week array
    this.requirementArr = [this.subject, this.subjectDescription, this.courseNumber, this.courseTitle,this.attributeDesc]
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
    var classListArr = [classList.subject,classList.subjectDescription,classList.courseNumber,classList.courseTitle,classList.attributeDesc]
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
        if(temp.includes(String(req)) || req == undefined || req == '')
        {
          return true
        }
      }
      return false
    }else{
      var temp = String(classItem).toUpperCase()
      if(!temp.includes(String(req)) && req != undefined && req != '')
        return false
      return true
  
    }
    

 
  }

  getClassesListString(classList, elementNum)
  {
    var classListArr = [classList.subject,classList.subjectDescription,classList.courseNumber,classList.courseTitle,classList.attributeDesc]
  
    var validArray = []
    var val = classListArr[elementNum]
    if (Array.isArray(val) && val.length > 1)
    { 
      for(var i = 0; i < val.length; ++i)
      {
        if(val[i].includes(this.requirementArr[elementNum]) || this.requirementArr[elementNum] == undefined || this.requirementArr[elementNum] == '')  
        {
          validArray.push(val[i])
          //return val[i]  
        }
      }
      return validArray
    }else
    {
       validArray.push(classListArr[elementNum])
       return validArray
      //  return classListArr[elementNum]
    }
    return validArray
     
    switch(elementNum)
    {
      // case 0:
      //   return String(classList.subject)
      //   break
      // case 1:
      //   return String(classList.subjectDescription)
      //   break
      // case 2:
      //   return String(classList.courseNumber)
      //   break
      // case 3:
      //   return String(classList.courseTitle)
      //   break          
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


