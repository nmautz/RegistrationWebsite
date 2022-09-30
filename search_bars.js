

function register_div_as_search(div, class_str, func){

  if(class_str == null){
    class_str = "search-bar"
  }


  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  dropdown.innerHTML = "jwnf"



  const input = document.createElement("input");
  input.classList.add(class_str)
  div.appendChild(input);
  div.appendChild(dropdown);



}


document.addEventListener("DOMContentLoaded", ()=>{


})