








document.addEventListener('DOMContentLoaded', function() {


  /*Get references for UI objects*/
  const classList = document.getElementsByClassName("class-display");
  const classInfoDisplay = document.getElementById("class-info-display");
  const closeClassInfoButton = document.getElementById("close-class-info-display-button");
  const addClassButton = document.getElementById("add-class-button")
  

  /*Basic Functions*/
  function openClassInfoBox(){
    classInfoDisplay.setAttribute("style", "flex: 2;");
    classInfoDisplay.style.opacity = "1";
  }
  
  function closeClassInfoBox(){
    classInfoDisplay.setAttribute("style", "flex: 0;");
    classInfoDisplay.style.opacity = "0";
  }


  class HTMLElementCreator {

    classListDisplay = null;
  
    constructor(){
      this.classListDisplay = document.getElementById("class-list-display");
    }
    createClassListing() {
      const divElement = document.createElement("div");
      const textNode = document.createTextNode("ENGL 201");
      divElement.classList.add("class-display")
      divElement.appendChild(textNode);
      
      divElement.addEventListener("click", function(){
        openClassInfoBox();
  
  
      })
  
  
      this.classListDisplay.insertBefore(divElement, document.getElementById("add-class-button"))
  
    }
  
  
  
  
  }












  closeClassInfoButton.addEventListener("click", function(){
    closeClassInfoBox();
  })

  var htmlElementCreator = new HTMLElementCreator();
  addClassButton.addEventListener("click", function(){
    htmlElementCreator.createClassListing()



  })




}, false);
