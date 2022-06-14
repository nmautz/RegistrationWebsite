document.addEventListener("DOMContentLoaded", function(){
  const continue_btn = document.getElementById("continue-button")

  continue_btn.addEventListener("click", function(){


    const subject_input = document.getElementById("subject_input")
    const courseNumber_input = document.getElementById("courseNumber_input")


    console.log(courseNumber_input.value)
    var sec = new class_search_query(subject_input.value,courseNumber_input.value)
    //TODO manage cookies somehow
    secJSON = JSON.stringify(sec)

    localStorage.setItem("query",secJSON)
    window.location.href = "../display_sections/display_sections.html";
    


  })




})