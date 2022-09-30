document.addEventListener("DOMContentLoaded", ()=>{

  const main_search_div = document.getElementById("main-search");

  register_div_as_search(main_search_div, null, null, "main-search-input");

  var searchManager = SearchManager.getInstance();
  searchManager.addRequirement("prof_name", "alf", (arg, class_section)=>{

    var pname = class_section.professorName.toLowerCase();
    arg = arg.toLowerCase();
    if(pname.includes(arg)){
      return true;
    }
    return false;
  });






})

document.addEventListener("click", ()=>{
  var searchManager = SearchManager.getInstance();

  console.log(searchManager.getClasses())
})