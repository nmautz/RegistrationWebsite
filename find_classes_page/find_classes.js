fetch("/classes.json").then(response => response.json()).then( function(jsonData){
    
    classesList = jsonData["data"]



})


function addClassSection(section, parent){




  //Create section
  const section_display = document.createElement("div")
  section_display.classList.add("section-display")
  parent.appendChild(section_display)
  
  //Middle display
  const middle_display = document.createElement("div")
  middle_display.classList.add("section-middle-display")
  section_display.appendChild(middle_display)

  //Middle text display

  const middle_text_display = document.createElement("div")
  middle_text_display.classList.add("section-middle-text-display")
  middle_display.appendChild(middle_text_display)


  //Text elements for middle display
  const course_title_text = document.createElement("p")
  course_title_text.classList.add("course-title-text")
  course_title_text.appendChild(document.createTextNode(section.courseTitle))
  middle_text_display.appendChild(course_title_text)


  const subject_courseNumber_text = document.createElement("p")
  subject_courseNumber_text.classList.add("subject-courseNumber-text")
  subject_courseNumber_text.appendChild(document.createTextNode(section.subject + section.courseNumber))
  middle_text_display.appendChild(subject_courseNumber_text)

  const professor_name_text = document.createElement("p")
  professor_name_text.classList.add("professor-name-text")
  professor_name_text.appendChild(document.createTextNode(section.professorName))
  middle_text_display.appendChild(professor_name_text)

  const section_hours_text = document.createElement("p")
  section_hours_text.classList.add("section-hours-text")
  section_hours_text.appendChild(document.createTextNode("9:45AM-10:45AM"))//TODO unhardcode this
  middle_text_display.appendChild(section_hours_text)


  //Middle week display
  const middle_week_display = document.createElement("div")
  middle_week_display.classList.add("section-middle-week-display")
  middle_display.appendChild(middle_week_display)

  //Weekday box
  week_symbols = ['S','M','T','W','T','F','S']
  for(var i = 0; i < 7; ++i)
  {
    const weekday_box_div = document.createElement("div")
    weekday_box_div.classList.add("weekday-box-display")
    middle_week_display.appendChild(weekday_box_div)

    const weekday_box_p = document.createElement("p")
    weekday_box_p.classList.add("weekday-box-text")
    weekday_box_p.appendChild(document.createTextNode(week_symbols[i]))
    weekday_box_div.appendChild(weekday_box_p)
  }

  //Right display
  const right_display = document.createElement("div")
  right_display.classList.add("section-right-display")
  section_display.appendChild(right_display)

  //Attributes display
  const attributes_display = document.createElement("div")
  right_display.classList.add("section-right-display")
  section_display.appendChild(right_display)
  




  
}

function checkClass(query, class_section){
    if (!(class_section.subject.match(String(query.subject).toUpperCase())) && query.subject != "" && query.subject != null)
      return false
    if (!(class_section.courseNumber.match(String(query.courseNumber)))  && query.courseNumber != "" && query.courseNumber != null)
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
    const courseNumber_input = document.getElementById("courseNumber-input").value
    var query = new class_search_query(subject_input, courseNumber_input)

    const classContainter = document.getElementById("classes-list-container")
    while(classContainter.firstChild){
        classContainter.removeChild(classContainter.firstChild)
    }

    

    add_sections_from_array(search_class(query))

}
  

  
document.addEventListener("DOMContentLoaded", function(){

    const subject_input = document.getElementById("subject-input")
    const courseNumber_input = document.getElementById("courseNumber-input")

    subject_input.addEventListener("keyup", function(){
        update_section_display()
    })
    courseNumber_input.addEventListener("keyup", function(){
        update_section_display()
    })

})