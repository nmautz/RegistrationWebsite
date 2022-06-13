

  /*Basic Functions*/
  


  // for search bar

  var majorsArr = []

  window.onload=function(){
    const input = document.getElementById("studyInput")
    input.addEventListener('keyup',updateValue)
  
    function updateValue()
    {   
      var targetNum = 0  
      const getInput = document.getElementById("studyInput").value
      targetNum = setDropdown(getInput)

      const elements1 = document.querySelectorAll(`[id^="a"]`)
      console.log(targetNum)
      for (var i = 0; i < elements1.length - targetNum - 1; ++i)
      {
        const element = document.getElementById("a")
        element.remove()
      }
    }  

    function setDropdown(fieldOfStudy)
    {
      var count = 0
      for(var i = 0; i < majorsArr.length; ++i)
      {
        if (majorsArr[i].includes(fieldOfStudy))
        {
          addDropDown(majorsArr[i])
          count++
        } 

      }
      return count
    }
  
    function addDropDown(fieldOfStudy)
    {
      const dropdownUI = document.getElementById("dropDown")
      const aElement = document.createElement("a")
      aElement.id = "a"
      const text = document.createTextNode(fieldOfStudy)
      aElement.appendChild(text)
      dropdownUI.insertAdjacentElement("beforeend",aElement)
    }
  }





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


  //stores text document with majors for dropdown in majorsArray[]
  fetch("listOfMajors.txt").then(response => response.text()).then(function(listOfMajorsData){
    
    var major = ""
    for (var i = 0; i < listOfMajorsData.length; ++i)
    { 
      if(listOfMajorsData[i] == "\n")
      {
        majorsArr.push(major)
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
