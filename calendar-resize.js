

document.addEventListener("DOMContentLoaded", ()=>{

  const cal = document.getElementById("calendar-container");
  const handle = document.getElementById("resize-handle");
  const cal_display = document.getElementById("calendar-display");
  var open = false;

  handle.addEventListener("click", ()=>{


    if(open){
      cal.style.height = "20px";
      handle.innerHTML = 'Expand'
      setTimeout(()=>{
      cal_display.style.display = "none";

      },250)

      open=false
    }else{
      cal.style.height = "80%";
      handle.innerHTML="Collapse";
      cal_display.style.display = "block";



      open = true;

    }


  })




})