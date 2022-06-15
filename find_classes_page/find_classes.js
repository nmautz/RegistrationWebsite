fetch("/classes.json").then(response => response.json()).then( function(jsonData){
    
    classesList = jsonData["data"]



})


function addClassSection(section, parent){

    const divElement = document.createElement("div")
    const textNode = document.createTextNode(section.subject + section.courseNumber + " " + section.courseTitle + " " +section.professorName)//
    divElement.appendChild(textNode)
    parent.insertAdjacentElement("beforeend",divElement)
  
  
}

function checkClass(query, class_section){
    if (class_section.subject != query.subject && query.subject != "" && query.subject != null)
      return false
    if (class_section.courseNumber != query.courseNumber && query.courseNumber != "" && query.courseNumber != null)
      return false
    return true
  
  
}

function search_class(class_search_query)
{
  var section_data = []
  for(var i = 0; i < classesList.length; ++i){
    if(checkClass(class_search_query, classesList[i]))
    {
      section_data.push(classesList[i])
    }



  }
  console.log(section_data)
  return section_data



}

function add_sections_from_array(sections){
    const classContainter = document.getElementById("classes-list-container")
    for(var i = 0; i < sections.length; ++i){
        addClassSection(sections[i], classContainter)
    }
    

}

function update_section_display(){
    const subject_input = document.getElementById("subject-input").value
    var query = new class_search_query(subject_input)

    const classContainter = document.getElementById("classes-list-container")
    while(classContainter.firstChild){
        classContainter.removeChild(classContainter.firstChild)
    }

    

    add_sections_from_array(search_class(query))

}
  

  
document.addEventListener("DOMContentLoaded", function(){

    const subject_input = document.getElementById("subject-input")

    subject_input.addEventListener("keyup", function(){
        update_section_display()
    })

})