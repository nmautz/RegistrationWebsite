



function register_div_as_search(div, class_str, onInput, dropdown_id, initialize, search_type){

  if(search_type == null){
    search_type = 'text'
  }

  if(class_str == null){
    if(search_type == 'text'){
      class_str = "search-bar"

    }else{
      class_str = "search-button"
    }
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


  input.addEventListener("input", onInput)

  if(search_type != 'text'){
    input.type = 'button';
  }


  dropdown.onscroll = ()=>{

    var headers = dropdown.getElementsByClassName("dropdown-header");



    for(var i = 0; i < headers.length; ++i){

      var headerOffset = findOffset(headers[i]);
      var dropdownScrollTop = dropdown.scrollTop+40;


      if (dropdownScrollTop = headerOffset.top) {
        headers[i].classList.add("sticky");
      } else {
        headers[i].classList.remove("sticky");
      }

    }




  }


  if(initialize != null){
    initialize();
  }


}

function addListingToDropdown(dropdown_id, str, css_class, func){
  if(css_class == null){
    css_class = "dropdown-item"
  }
  dropdown_id = document.getElementById(dropdown_id);

  const listing = document.createElement("div");
  listing.classList.add(css_class);
  listing.innerHTML = str;

  dropdown_id.appendChild(listing);

  if(func != null)
    listing.addEventListener("click", ()=>{
      func(str);
    })



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

function findOffset(element) {
  var top = 0, left = 0;

  do {
    top += element.offsetTop  || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while(element);

  return {
    top: top,
    left: left
  };
}