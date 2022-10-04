//Write the func here

//


document.addEventListener("DOMContentLoaded", ()=>{

  const main_search_div = document.getElementById("main-search");
  const plan_select_div = document.getElementById("plan-select");


  register_div_as_search(main_search_div, null, ()=>{

    const input = main_search_div.firstChild;

    clearDropdown("main-search-input");
    

  

    setDropdownTitle(input);
    
    setDropdownProf(input);



  }, "main-search-input");


  register_div_as_search(plan_select_div, null, ()=>{
    const input = plan_select_div.firstChild; //input is available here

    //This gets ran on input (aka when something is typed in the box)

    //Use this to search and narrow down the results

    //do search and get good results

    //clear dropdown

    //addresults with proper onclick listener. this will be the same as "func" on line 51. you should make a function above on line 1

    

  }, "plan-id-input", ()=>{ //plan-id-input will be the id of the input if needed. it is the same as the above input

    //This gets ran when the box is initialized (aka right after this function is almost finished)
    //use this box to load plans and add them to the lising
    

    //get plan-ids
    const planIds = get_plan_IDs();


    //for loop

    for(var i in planIds){

      addListingToDropdown("plan-id-input", planIds[i], null, ()=>{

        console.log("CLICKED " + planIds[i]);



      });

    }


    //call addListingToDropdown(dropdown_id, str, css_class, func) the function "func" will be called whenever the added item is called. onclick
    //func will be passed str as an argument. you will also have access to any variables you have here



  }) 


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

    var ctitle = class_section.subject.toLowerCase() + class_section.courseNumber + class_section.courseTitle.toLowerCase();
    ctitle = ctitle.replace(/ /g, "");
    arg = arg.toLowerCase().replace(/ /g, "");
    if(ctitle.includes(arg)){
      return true;
    }
    return false;


  });



  //Calendar setup (calendar.js)

  Calendar.getInstance().update_calendar();
  





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

