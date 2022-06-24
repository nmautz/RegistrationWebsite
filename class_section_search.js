
class class_search_query{

  constructor(){

    this.subject
    this.subjectDescription 
    this.courseNumber 
    this.courseTitle
    
    //should we use array instead?
    // this.requirementArr = [this.subject, this.subjectDescription, this.courseNumber, this.courseTitle]
  }


  addQueryRequirement(data,elementNum)
  {
    switch(elementNum)
    {
      case 0:
        this.subject = data
        break
      case 1:
        this.subjectDescription = data
        break
      case 2:
        this.courseNumber = data
        break
      case 3:
        this.courseTitle = data
        break
    }
    this.requirementArr = [this.subject, this.subjectDescription, this.courseNumber, this.courseTitle]
  }

  meetsRequirements(classList)
  {
    var meetsReq = true

    var temp = String(classList.subject).toUpperCase()
    if(!temp.includes(String(this.subject)) && this.subject != undefined)
      meetsReq = false

    temp = String(classList.subjectDescription).toUpperCase()
    if(!temp.includes(this.subjectDescription) && this.subjectDescription != undefined)
      meetsReq = false

    temp = String(classList.courseNumber).toUpperCase()
    if(!temp.includes(this.courseNumber) && temp != this.courseNumber  && this.courseNumber != undefined)
      meetsReq = false

    temp = String(classList.courseTitle).toUpperCase()
    if(!temp.includes(this.courseTitle) && temp != this.courseTitle && this.courseTitle != undefined)
      meetsReq = false


    return meetsReq
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


