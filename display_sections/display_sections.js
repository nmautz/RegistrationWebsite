

function addClassSection(section, parent){

  const divElement = document.createElement("div")
  const textNode = document.createTextNode("bird")//section.subject + section.courseNumber
  divElement.appendChild(textNode)
  parent.insertAdjacentElement("beforeend",divElement)



}




document.addEventListener("DOMContentLoaded", function(){


  const section_list_display = document.getElementById("sections-list-display")
  addClassSection("d", section_list_display)
  query = localStorage.getItem("query")
  localStorage.removeItem("query")
  console.log(query)
  

  



})