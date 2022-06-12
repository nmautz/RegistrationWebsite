

  /*Basic Functions*/
  
  
  function getClassById(id)
  {


    for(i = 0; i < classesList.length; ++i){
      if(classesList[i].id == id){
        return classesList[i];
      }
    }

  }
  
  function openClassInfoBox(id){

    const classInfoDisplay = document.getElementById("class-info-display");
    const classInfoDisplayName = document.getElementById("class-name-info-display") 

    classInfoDisplay.setAttribute("style", "flex: 2;");
    classInfoDisplay.style.opacity = "1";

    singleClass = getClassById(id);


    classInfoDisplayName.innerHTML = singleClass.courseTitle;
  }
  
  function closeClassInfoBox(){
    const classInfoDisplay = document.getElementById("class-info-display");
    classInfoDisplay.setAttribute("style", "flex: 0;");
    classInfoDisplay.style.opacity = "0";
  }


  //Class for creating template html elements like new class listings
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




//Fetches the json file with classlist. when the data is ready the inside code will execute, while waiting it will continue
classesList = null

fetch("classes.json").then(response => response.json()).then( function(jsonData){
  classesList = jsonData["data"]
})





//everything in here runs after the html website has been loaded
document.addEventListener('DOMContentLoaded', function() {

//for dropdown
  fetch("listOfMajors.txt").then(response => response.text()).then(function(listOfMajorsData){
    
    var major = ""
    for (var i = 0; i < listOfMajorsData.length; ++i)
    { 
      if(listOfMajorsData[i] == "\n")
      {
        const dropdownUI = document.getElementById("dropDown")
        const aElement = document.createElement("a")
        const text = document.createTextNode(major)
        aElement.appendChild(text)
        dropdownUI.insertAdjacentElement("beforeend",aElement)
        major = ""
      }else
      {
        major += listOfMajorsData[i]
      }
      
    }
  })






  /*Get references for UI objects*/
  const closeClassInfoButton = document.getElementById("close-class-info-display-button");
  const addClassButton = document.getElementById("add-class-button")
  


  closeClassInfoButton.addEventListener("click", function(){
    closeClassInfoBox();
  })

  var htmlElementCreator = new HTMLElementCreator();
  addClassButton.addEventListener("click", function(){
    htmlElementCreator.createClassListing()



  })




}, false);
