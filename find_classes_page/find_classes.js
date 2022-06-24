fetch("/classes.json").then(response => response.json()).then( function(jsonData){
    
    classesList = jsonData["data"]



})

function checkClass(query, class_section){
    if (!(class_section.subject.match(String(query.subject).toUpperCase())) && query.subject != "" && query.subject != null)
      return false
    if (!(class_section.courseNumber.match(String(query.courseNumber)))  && query.courseNumber != "" && query.courseNumber != null)
      return false
    return true
  
  
}


function search_class()
{
  var section_data = []
  for(var i = 0; i < classesList.length; ++i){
    if(requirement.meetsRequirements(classesList[i]))
    {
        console.log(classesList[i].courseTitle)

      section_data.push(classesList[i])
    }



  }
  return section_data



}

function add_sections_from_array(sections){
    const classContainter = document.getElementById("classes-list-container")
    for(var i = 0; i < sections.length; ++i){
        addClassSection(sections[i], classContainter)
    }
    

}

function update_section_display(){

    const classContainter = document.getElementById("classes-list-container")
    while(classContainter.firstChild){
        classContainter.removeChild(classContainter.firstChild)
    }

    


    add_sections_from_array(search_class())


}
  

  
document.addEventListener("DOMContentLoaded", function(){

    const subject_input = document.getElementById("subject-input")
    const courseNumber_input = document.getElementById("courseNumber-input")

})