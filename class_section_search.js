
class class_search_query{

  constructor(){

    this.subject
    this.subjectDescription 
    this.courseNumber 
    this.courseTitle
    this.attribute
    //weekDays holds the week array
    this.requirementArr = [this.subject, this.subjectDescription, this.courseNumber, this.courseTitle,this.attribute]
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
    console.log(classList.courseTitle)
    console.log(classList.attributeDesc)
    for (var i = 0; i < classList.attributeDesc.length; ++i)
    {
      console.log(i)
    }
    return true
  }


  checkRequirement(req,base)
  {
    // for (var i = 0; i < base.length; ++i)
    // {
    //   console.log(i)
    //   console.log(base[i])
    // }
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


