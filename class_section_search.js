
class class_search_query{

  constructor(subject, courseNumber){

    this.subject = subject
    this.courseNumber = courseNumber
  }

  checkClass(class_section){
    if (class_section.subject != this.subject && this.subject != null)
      return false
    if (class_section.courseNumber != this.courseNumber && this.courseNumber != null)
      return false
    return true


  }




}


function search_class(class_search_query)
{
  fetch("classes.json").then(response => response.json()).then( function(jsonData){

    console.log("searching")
    classesList = jsonData["data"]
    for(var i = 0; i < classesList.length; ++i){
      if(class_search_query.checkClass(classesList[i]))
      {
        console.log(classesList[i])
      }



    }



  })
  


}




