document.addEventListener("DOMContentLoaded", ()=>{

  const main_search_div = document.getElementById("main-search");

  register_div_as_search(main_search_div, null, ()=>{

    const input = main_search_div.firstChild;

    clearDropdown("main-search-input");
    if(input.value != ""){
      SearchManager.getInstance().updateRequirement("prof_name", input.value)
  
      const classes = SearchManager.getInstance().getClassesByReq("prof_name")
  

      setDropdownTitle(classes);
      
      setDropdownProf(classes);









    }



  }, "main-search-input");

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







})

function setDropdownTitle(classes){
  addListingToDropdown("main-search-input", "Course Titles", "dropdown-header");

  var titles = [];

  for (var class_section in classes) {
    if (!titles.includes(classes[class_section].courseTitle)) {
      titles.push(classes[class_section].courseTitle);
    }
  }

  for (var title in titles) {
    addListingToDropdown("main-search-input", titles[title]);
  }
}

function setDropdownProf(classes) {
  addListingToDropdown("main-search-input", "Professors", "dropdown-header");

  var prof_names = [];

  for (var class_section in classes) {
    if (!prof_names.includes(classes[class_section].professorName)) {
      prof_names.push(classes[class_section].professorName);
    }
  }

  for (var name in prof_names) {
    addListingToDropdown("main-search-input", prof_names[name]);
  }
}

