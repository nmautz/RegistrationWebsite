

function addClassSection(section, parent){

  const divElement = document.createElement("div")
  const textNode = document.createTextNode(section.subject + section.courseNumber + " Prof:" + section.professorName)//
  divElement.appendChild(textNode)
  parent.insertAdjacentElement("beforeend",divElement)



}

function checkClass(query, class_section){
  if (class_section.subject != query.subject && query.subject != null)
    return false
  if (class_section.courseNumber != query.courseNumber && query.courseNumber != null)
    return false
  return true


}



function search_class(class_search_query, classList)
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



document.addEventListener("DOMContentLoaded", function(){

  //Get query data
  query = JSON.parse(localStorage.getItem("query"))
  //localStorage.removeItem("query")

  fetch("/classes.json").then(response => response.json()).then( function(jsonData){
    
    classesList = jsonData["data"]

    sections = search_class(query, classesList)


    //Load display elements and add section
    const section_list_display = document.getElementById("sections-list-display")

    for(var i = 0; i < sections.length; ++i){
      addClassSection(sections[i], section_list_display)
    }


  })



  

  

  



})