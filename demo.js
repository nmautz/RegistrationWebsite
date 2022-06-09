

class HTMLElementCreator {

  constructor(){

  }
  createClassListing() {
    //TODO
  }




}






document.addEventListener('DOMContentLoaded', function() {


  /*Get references for UI objects*/
  const classList = document.getElementsByClassName("class-display");
  const classInfoDisplay = document.getElementById("class-info-display");
  const closeClassInfoButton = document.getElementById("close-class-info-display-button");
  

  /*Basic Functions*/
  function openClassInfoBox(){
    classInfoDisplay.setAttribute("style", "flex: 2;");
    classInfoDisplay.style.opacity = "1";
  }
  
  function closeClassInfoBox(){
    classInfoDisplay.setAttribute("style", "flex: 0;");
    classInfoDisplay.style.opacity = "0";
  }

  /*Used to assign open box to temp class objects*/
  for(var i = 0; i < classList.length; ++i){
  
    classList[i].addEventListener("click", function() {
      openClassInfoBox();
    } )
  }

  closeClassInfoButton.addEventListener("click", function(){
    closeClassInfoBox();
  })






}, false);
