




document.addEventListener("DOMContentLoaded", ()=>{

  calendar_handle_setup();
  search_expand_setup();






})


function search_expand_setup(){

}

function calendar_handle_setup() {
  const cal = document.getElementById("calendar-container");
  const handle = document.getElementById("resize-handle");
  var open = false;

  handle.addEventListener("click", () => {


    if (open) {
      cal.style.height = "20px";
      handle.innerHTML = 'Expand';
      open = false;
    } else {
      cal.style.height = "80%";
      handle.innerHTML = "Collapse";
      open = true;

    }


  });
}