
function parse_time(str){
  var hours = str.substring(0,2)

  if(parseInt(hours) < 12){

    var am_pm = " AM"
    hours = String(parseInt(hours))

  }else{
    var am_pm = " PM"

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
  const pElement = document.createElement("p");
  pElement.classList.add(class_string);
  pElement.appendChild(document.createTextNode(text_string));
  parent.appendChild(pElement);
  return pElement;


}

function createPTextElementBefore(ref_elem, class_string, text_string){

  const pElement = document.createElement("p");
  pElement.classList.add(class_string);
  pElement.appendChild(document.createTextNode(text_string));
  ref_elem.parentNode.insertBefore(pElement, ref_elem);
  return pElement;

}



function createDisplayContentBasic(section_display, section){
  //Left display
  const left_display = createDivElement(section_display, "section-left-display")

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


  const middle_week_display = createWeekDisplay(middle_display, section);




  //Attributes display
  const attributes_display = createDivElement(middle_display, "attributes-display")
  
  //Attributes title text
  const attributes_title_text = createPTextElement(attributes_display, "attributes-title-text", "Attributes")


  //Attributes list display
  const attributes_list_display = createDivElement(attributes_display, "attributes-list-display")

  //Attributes list item text 
  for(var i = 0; i < section.attributeCodes.length; ++i){

    const attribute_list_item_p = createPTextElement(attributes_list_display, "attribute-text", section.attributeCodes[i])

  }


  //Occupancy display
  const occupancy_dispay = createDivElement(middle_display, "occupancy-display")
/*
  //Occupancy title text
  const occupancy_title_text = document.createElement("p")
  occupancy_title_text.classList.add("occupancy-title-text")
  occupancy_title_text.appendChild(document.createTextNode("Occupancy"))
  occupancy_dispay.appendChild(occupancy_title_text)
*/
  //Occupancy info text
  const occupancy_info_text = createPTextElement(occupancy_dispay, "occupancy-info-text",section.seatsAvailable + "/" + section.maximumEnrollment +" Available" )



  //Right display
  const right_display = createDivElement(section_display, "section-right-display")

}



function createDisplayContentExtended(section_display, section){

  const left_display = createDivElement(section_display, "section-left-display");
  const middle_display = createDivElement(section_display, "section-middle-display");
  const right_display = createDivElement(section_display, "section-right-display");
  createExtendedLeftContent(left_display, section);
  createExtendedMiddleContent(middle_display,section);
}


function createExtendedLeftContent(left_display, section){
  const restrictionsDiv = createDivElement(left_display, "section-display-side-div");
  createPTextElement(restrictionsDiv, "section-display-side-title", "Restrictions")
  createPTextElement(restrictionsDiv, "section-display-side-text", "TODO PULL RESTRICTIONS");

  const prereqDiv = createDivElement(left_display, "section-display-side-div");
  createPTextElement(prereqDiv, "section-display-side-title", "Prerequisites");
  createPTextElement(prereqDiv, "section-display-side-text", "TODO PULL PREREQS");

  const coreqDiv = createDivElement(left_display, "section-display-side-div");
  createPTextElement(coreqDiv, "section-display-side-title", "Corequisites");
  createPTextElement(coreqDiv, "section-display-side-text", "TODO PULL COREQS");



}

function createExtendedMiddleContent(middle_display, section){

  var top_elements_div = createDivElement(middle_display, "section-middle-text-display");
  var course_title_text = createPTextElement(top_elements_div, "course-title-text", section.courseTitle);
  var subject_courseNumber_text = createPTextElement(top_elements_div, "subject-courseNumber-text", section.subject + section.courseNumber + " | " + section.creditHourSession + " credit hours");
  var course_desc_text = createPTextElement(middle_display, "course-desc-text", "TODO Pull content");

  var prof_info_div = createDivElement(middle_display, "prof-info-display");
  var prof_name = createPTextElement(prof_info_div, "professor-name-text", section.professorName);
  var prof_email = createPTextElement(prof_info_div, "prof-email-text", section.professorEmail);

  var building_info_div = createDivElement(middle_display, "building-info-display");
  var campus_building_text = createPTextElement(building_info_div, "campus-building-text", section.campusDescription + 
  " Campus | " + section.buildingDescription);
  var room_text = createPTextElement(building_info_div, "room-text", "Room " + section.room);

  var week_display = createWeekDisplay(building_info_div, section)

  //Format time for section hours text
  var beginTime = parse_time(String(section.beginTime))
  var endTime = parse_time(String(section.endTime))

  const section_hours_text = createPTextElement(building_info_div, "section-hours-text", beginTime + "-" + endTime)



}

function createWeekDisplay(parent, section){
  //Middle week display
  const middle_week_display = createDivElement(parent, "section-middle-week-display")
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
  return middle_week_display;
}


function openSectionDisplay(display, section){



  
  //Make changes (try to keep some order)
  display.style.height = "80vh"

  //Delete existing content
  var children = display.childNodes;

  while(display.hasChildNodes()){
    display.removeChild(children[0]);
  }

  createDisplayContentExtended(display, section);


}

function closeSectionDisplay(display, section){


  //Get element refs
  const subject_courseNumber_text = display.getElementsByClassName("subject-courseNumber-text")[0];
  
  
    //Make changes (try to keep some order)
  display.style.height = "30vh"
  subject_courseNumber_text.innerHTML = section.subject + section.courseNumber;

  //Delete existing content
  var children = display.childNodes;

  while(display.hasChildNodes()){
    display.removeChild(children[0]);
  }

  createDisplayContentBasic(display,section);


  

}


function toggleSectionDisplay(display, section){
  if( display.style.height == "30vh" || display.style.height == ""){
    openSectionDisplay(display, section)
  }else{
    closeSectionDisplay(display, section)
  }
  createSaveButton(display, section);

}


function createSaveButton(section_display, section){
  
  //Create save button

  const save_button = document.createElement("div")
  save_button.classList.add("save-button")
  save_button.appendChild(document.createTextNode(" "))

  if(!is_class_saved(section)){
    save_button.style.borderColor ="rgb(202, 202, 251)"
    save_button.style.borderBottomColor = "transparent"



  }else{
    save_button.style.borderColor ="gold"
    save_button.style.borderBottomColor = "transparent"
  }

  save_button.addEventListener("click", function(e){
    if(save_button.style.borderColor == "gold gold transparent"){
      save_button.style.borderColor ="rgb(202, 202, 251)"
      save_button.style.borderBottomColor = "transparent"
      remove_class_by_ID(section.id)



    }else{
      save_button.style.borderColor ="gold"
      save_button.style.borderBottomColor = "transparent"

      const planID = document.getElementById("planID-input").value;
      save_class(planID,section);
    }


    e.stopPropagation()







  })


  section_display.appendChild(save_button)
}



function addClassSection(section, parent){


  //Create section
  const section_display = createDivElement(parent,"section-display")
  section_display.setAttribute("id", section.id);

  //Click listener on section
  section_display.addEventListener("click", function(){


    toggleSectionDisplay(section_display, section)

    



  })




  createSaveButton(section_display, section);
  createDisplayContentBasic(section_display,section);
    

}
