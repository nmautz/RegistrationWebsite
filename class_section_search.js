
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

  print()
  {
    console.log(this.subject)
  }

}


