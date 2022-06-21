
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
        this.courseNumber = data
        break
    }
  }

  meetsRequirements(classList)
  {
    var meetsReq = true
    if(classList.subject != this.subject && this.subject != null)
      meetsReq = false
    if(classList.subjectDescription != this.subjectDescription && this.subjectDescription != null)
      meetsReq = false
    if(classList.courseNumber != this.courseNumber && this.courseNumber != null)
      meetsReq = false
    if(classList.courseTitle != this.courseTitle && this.courseTitle != null)
      meetsReq = false



    meetsReq = true
    return meetsReq
  }

  print()
  {
    console.log(this.subject)
  }

}


