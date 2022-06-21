
class class_search_query{

  constructor(subject, subjectDescription, courseNumber, courseTitle){

    this.subject = subject
    this.subjectDescription = subjectDescription
    this.courseNumber = courseNumber
    this.courseTitle = courseTitle
    
    //should we use array instead?
    this.requirementArr = [this.subject, this.subjectDescription, this.courseNumber, this.courseTitle]
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
  }

  meetsRequirements(classList)
  {
    var meetsReq = true

    var temp = String(classList.subject).toUpperCase()
    if(temp.includes(String(this.subject)) && this.subject != undefined)
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

  print()
  {
    console.log(this.courseNumber)
    console.log(this.courseTitle)
  }

}


