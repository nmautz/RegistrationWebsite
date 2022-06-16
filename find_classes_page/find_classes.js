fetch("/classes.json").then(response => response.json()).then( function(jsonData){
    
    classesList = jsonData["data"]



})


function parse_time(str){
  var hours = str.substring(0,2)

  if(parseInt(hours) < 12){

    var am_pm = "AM"
    hours = String(parseInt(hours))

  }else{
    var am_pm = "PM"

    if(hours == "12"){
      hours = String(parseInt(hours))
    }else{

      hours = String(parseInt(hours) - 12)
    }

    
  }
  str = hours + ":" + str.substring(2,4) + am_pm
  return str

}


function createDivElement(parent, class_string){
  const divElement = document.createElement("div")
  divElement.classList.add(class_string)
  parent.appendChild(divElement)
  return divElement
}

function createPTextElement(parent, class_string, text_string){
  const pElement = document.createElement("p")
  pElement.classList.add(class_string)
  pElement.appendChild(document.createTextNode(text_string))
  parent.appendChild(pElement)
  return pElement


}

function addClassSection(section, parent){




  //Create section
  const section_display = createDivElement(parent,"section-display")
  
  //Middle display
  const middle_display = createDivElement(section_display, "section-middle-display")

  //Middle text display

  const middle_text_display = createDivElement(middle_display, "section-middle-text-display")


  //Text elements for middle display
  const course_title_text = createPTextElement(middle_text_display, "course-title-text", section.courseTitle)

  const subject_courseNumber_text = createPTextElement(middle_text_display, "subject-courseNumber-text", section.subject + section.courseNumber)

  const professor_name_text = createPTextElement(middle_text_display, "professor-name-text", section.professorName)


  //Format time for section hours text
  var beginTime = parse_time(String(section.beginTime))
  var endTime = parse_time(String(section.endTime))

  const section_hours_text = createPTextElement(middle_text_display, "section-hours-text", beginTime + "-" + endTime)


  //Middle week display
  const middle_week_display = createDivElement(middle_display, "section-middle-week-display")
  //Weekday box
  week_days = [section.sunday, section.monday, section.tuesday, section.wednesday, section.thursday, section.friday, section.saturday]
  week_symbols = ['S','M','T','W','T','F','S']
  for(var i = 0; i < 7; ++i)
  {
    const weekday_box_div = document.createElement("div")
    weekday_box_div.classList.add("weekday-box-display")
    middle_week_display.appendChild(weekday_box_div)

    const weekday_box_p = document.createElement("p")
    weekday_box_p.classList.add("weekday-box-text")
    //Coloring
    if(week_days[i] == "true")
    {
      weekday_box_div.classList.add("class_on_this_day_weekday_color")
    }



    weekday_box_p.appendChild(document.createTextNode(week_symbols[i]))
    weekday_box_div.appendChild(weekday_box_p)
  }

  //Right display
  const right_display = createDivElement(section_display, "section-right-display")

  //Attributes display
  const attributes_display = createDivElement(right_display, "attributes-display")
  
  //Attributes title text
  const attributes_title_text = createPTextElement(attributes_display, "attributes-title-text", "Attributes")


  //Attributes list display
  const attributes_list_display = createDivElement(attributes_display, "attributes-list-display")

  //Attributes list item text 
  for(var i = 0; i < section.attributeCodes.length; ++i){

    const attribute_list_item_p = createPTextElement(attributes_list_display, "attribute-text", section.attributeCodes[i])

  }



  //-----------------

  //Occupancy display
  const occupancy_dispay = createDivElement(right_display, "occupancy-display")
/*
  //Occupancy title text
  const occupancy_title_text = document.createElement("p")
  occupancy_title_text.classList.add("occupancy-title-text")
  occupancy_title_text.appendChild(document.createTextNode("Occupancy"))
  occupancy_dispay.appendChild(occupancy_title_text)
*/
  //Occupancy info text
  const occupancy_info_text = createPTextElement(occupancy_dispay, "occupancy-info-text",section.seatsAvailable + "/" + section.maximumEnrollment +" Available" )

  
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