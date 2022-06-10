



classesList = null

fetch("classes.json").then(response => response.json()).then( function(jsonData){
  classesList = jsonData["data"]
  console.log(classesList)
})


function getClassById(id)
{


  for(i = 0; i < classesList.length; ++i){
    if(classesList[i].id == id){
      console.log("FOUND IT");
      return classesList[i];
    }
  }

}




document.addEventListener('DOMContentLoaded', function() {


  /*Get references for UI objects*/
  const classList = document.getElementsByClassName("class-display");
  const classInfoDisplay = document.getElementById("class-info-display");
  const closeClassInfoButton = document.getElementById("close-class-info-display-button");
  const addClassButton = document.getElementById("add-class-button")
  const classInfoDisplayName = document.getElementById("class-name-info-display")
  

  /*Basic Functions*/
  function openClassInfoBox(id){
    classInfoDisplay.setAttribute("style", "flex: 2;");
    classInfoDisplay.style.opacity = "1";

    singleClass = getClassById(id);

    console.log(singleClass)

    classInfoDisplayName.innerHTML = singleClass.courseTitle;
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

      var singleClass = classesList[Math.floor(Math.random()*classesList.length)];

      const divElement = document.createElement("div");
      const textNode = document.createTextNode(singleClass.subject + singleClass.courseNumber);
      divElement.classList.add("class-display")
      divElement.appendChild(textNode);
  
      divElement.addEventListener("click", function(){
        openClassInfoBox(singleClass.id);
  
  
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
