document.addEventListener("DOMContentLoaded", function(){
  const continue_btn = document.getElementById("continue-button")

  continue_btn.addEventListener("click", function(){



    var sec = new class_search_query("ACCT")
    //TODO manage cookies somehow
    secJSON = JSON.stringify(sec)

    localStorage.setItem("query",secJSON)
    window.location.href = "../display_sections/display_sections.html";
    


  })




})