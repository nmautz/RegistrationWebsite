



function register_div_as_search(div, class_str, func, dropdown_id){

  if(class_str == null){
    class_str = "search-bar"
  }




  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  dropdown.innerHTML = "jwnf"
  if(dropdown_id != null){
    dropdown.id = dropdown_id
  }



  const input = document.createElement("input");
  input.classList.add(class_str)
  div.appendChild(input);
  div.appendChild(dropdown);


  input.addEventListener("input", ()=>{

    SearchManager.getInstance().updateRequirement("prof_name", input.value)
  
    update_section_display();

  })



}


document.addEventListener("DOMContentLoaded", ()=>{


})