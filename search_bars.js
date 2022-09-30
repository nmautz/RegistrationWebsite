



function register_div_as_search(div, class_str, func, dropdown_id){

  if(class_str == null){
    class_str = "search-bar"
  }




  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  if(dropdown_id != null){
    dropdown.id = dropdown_id
  }



  const input = document.createElement("input");
  input.classList.add(class_str)
  div.appendChild(input);
  div.appendChild(dropdown);


  input.addEventListener("input", ()=>{

    clearDropdown("main-search-input");
    if(input.value != ""){
      SearchManager.getInstance().updateRequirement("prof_name", input.value)
  
      const classes = SearchManager.getInstance().getClassesByReq("prof_name")
  
      var prof_names = [];
  
      for(var class_section in classes){
        if(!prof_names.includes(classes[class_section].professorName)){
          prof_names.push(classes[class_section].professorName)
        }
      }
  
      for(var name in prof_names){
        addListingToDropdown("main-search-input", prof_names[name]);
      }
    }



  })



}

function addListingToDropdown(dropdown_id, str, css_class){
  if(css_class == null){
    css_class = "dropdown-item"
  }
  dropdown_id = document.getElementById(dropdown_id);

  const listing = document.createElement("div");
  listing.classList.add(css_class);
  listing.innerHTML = str;

  dropdown_id.appendChild(listing);



}

function clearDropdown(dropdown_id){
  var dropdown = document.getElementById(dropdown_id);

  while(dropdown.firstChild){
    dropdown.removeChild(dropdown.lastChild);
  }

}

document.addEventListener("click", ()=>{

  const searchbar = document.getElementById("main-search-input");
})