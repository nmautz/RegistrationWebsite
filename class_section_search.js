
class class_search_query{

  constructor(){

    this.subject
    this.subjectDescription 
    this.courseNumber 
    this.courseTitle
    this.attributeDesc
    //weekDays holds the week array
    this.requirementArr = [this.subject, this.subjectDescription, this.courseNumber, this.courseTitle,this.attributeDesc]
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
        if(temp.includes(req))
        {
          return true
        }
      }
      return false
    }else{
      var temp = String(classItem).toUpperCase()
      if(!temp.includes(String(req)) && req != undefined)
        return false
      return true
  
    }
    

 
  }

  getClassesListString(classList, elementNum)
  {
    var classListArr = [classList.subject,classList.subjectDescription,classList.courseNumber,classList.courseTitle,classList.attributeDesc]
    // if (Array.isArray(classItem) && classItem.length > 1)
    // {
    //   for(var i = 0; i < classList.length; ++i)
    //   {
    //     var temp = String(classList[i]).toUpperCase()
    //     if(temp.includes(req))
    //     {
    //       return temp
    //     }
    //   }
    // }
    return String(classListArr[elementNum])
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


