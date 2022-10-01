document.addEventListener("DOMContentLoaded", ()=>{

  const main_search_div = document.getElementById("main-search");

  register_div_as_search(main_search_div, null, ()=>{

    const input = main_search_div.firstChild;

    clearDropdown("main-search-input");
    

  

    setDropdownTitle(input);
    
    setDropdownProf(input);



  }, "main-search-input");
  setDropdownTitle(main_search_div.firstChild);
    
  setDropdownProf(main_search_div.firstChild);

  var searchManager = SearchManager.getInstance();
  searchManager.addRequirement("prof_name", "", (arg, class_section)=>{
    

    var pname = class_section.professorName.toLowerCase();
    arg = arg.toLowerCase();
    if(pname.includes(arg)){
      return true;
    }
    return false;
  });

  searchManager.addRequirement("course_title", "", (arg, class_section)=>{

    var ctitle = class_section.courseTitle.toLowerCase();
    arg = arg.toLowerCase();
    if(ctitle.includes(arg)){
      return true;
    }
    return false;


  });



  //Calendar setup (calendar.js)

  Calendar.getInstance();





})

function setDropdownTitle(input ){
  addListingToDropdown("main-search-input", "Course Titles", "dropdown-header");

  if(input.value != ""){
    SearchManager.getInstance().updateRequirement("course_title", input.value)
  
    classes = SearchManager.getInstance().getClassesByReq("course_title")
  
    var titles = [];
  
    for (var class_section in classes) {
      if (!titles.includes(classes[class_section].courseTitle)) {
        titles.push(classes[class_section].courseTitle);
      }
    }
  
    for (var title in titles) {
      addListingToDropdown("main-search-input", titles[title], null, (str)=>{
        var sm = SearchManager.getInstance();

        sm.clearAllRestrictionsArg();

        sm.updateRequirement("course_title", str)

        update_section_display();

      });
    }
  }

}

function setDropdownProf( input) {
  addListingToDropdown("main-search-input", "Professors", "dropdown-header");

  if(input.value != ""){

    SearchManager.getInstance().updateRequirement("prof_name", input.value)
  
    classes = SearchManager.getInstance().getClassesByReq("prof_name")
  
    var prof_names = [];
  
    for (var class_section in classes) {
      if (!prof_names.includes(classes[class_section].professorName)) {
        prof_names.push(classes[class_section].professorName);
      }
    }
  
    for (var name in prof_names) {
      addListingToDropdown("main-search-input", prof_names[name], null, (str)=>{

        var sm = SearchManager.getInstance();

        sm.clearAllRestrictionsArg();

        sm.updateRequirement("prof_name", str)

        update_section_display();



      });
    }
  }

}

