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

    //This gets ran on click 


    console.log("CLICKED PLANID BTN");

  }, "plan-id-input", ()=>{ //plan-id-input will be the id of the input if needed. it is the same as the above input

    //This gets ran when the box is initialized (aka right after this function is almost finished)
    //use this box to load plans and add them to the lising
    const input = plan_select_div.childNodes[1]; //input is available here

    input.value = Calendar.getInstance().getCurrentPlanID();
    




    //get plan-ids
    updatePlanDropdown(plan_select_div);

    

  }, 'button') 


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

function updatePlanDropdown(plan_select_div) {

  clearDropdown("plan-id-input");



  //option to add plan
  addListingToDropdown("plan-id-input", "Add Plan", null, ()=>{
    var newPlan = prompt("Enter Plan Name");
    create_plan(newPlan);
    Calendar.getInstance().setCurrentPlanID(newPlan);
    updatePlanDropdown(plan_select_div);


  });

  const planIds = get_plan_IDs();
  //for loop
  for (var i in planIds) {

    let ii = i;

    addListingToDropdown("plan-id-input", planIds[i], null, () => {

      Calendar.getInstance().setCurrentPlanID(planIds[ii]);

      //Ben add whatever code is needed here
      //get input
      const input = plan_select_div.childNodes[1];

      //Update input text
      input.value = planIds[ii];

      //update calendar (function might have unexpected results however page refresh may fix it, bug fix is coming)
      var calendar = Calendar.getInstance();
    });

  }
}

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

