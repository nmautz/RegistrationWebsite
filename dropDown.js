// for search bar
var majorsArr = []
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


//Code for showing dropdown

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById("dropdownContainerDiv")
    dropdown.onmouseover = function(){
        const dropdownUI = document.getElementById("dropDown")
        dropdownUI.style.display = "block"
        dropdown.style.display = "block"
        updateValue()


    }
})


//Code for hiding dropdown

window.addEventListener('click', function(e){   
    if (document.getElementById('dropdownContainerDiv').contains(e.target)){
      // Clicked in box
    } else{
        const dropdown = document.getElementById("dropdownContainerDiv")
        const dropdownUI = document.getElementById("dropDown")
        dropdownUI.style.display = "none"
        dropdown.style.display = "inline-block"
    
    
    }
  });


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