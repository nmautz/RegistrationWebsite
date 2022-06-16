fetch("../classes.json").then(response => response.json()).then( function(jsonData){
  classesList = jsonData["data"]
})

// for search bar
var majorsArr = []

//stores text document with majors for dropdown in majorsArray[]
fetch("listOfMajors.txt").then(response => response.text()).then(function(listOfMajorsData){
    if(majorsArr.length == 0)
    {
    var major = ""
    for (var i = 0; i <= listOfMajorsData.length; ++i)
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
  }
})

var testKey = []
//is called every time click is made (inefficient)
var majorsArrKey = []
function setMajorsKey()
{
  for (var i = 0; i < classesList.length; ++i)
  {
    
    if (!majorsArrKey.includes(classesList[i].subjectDescription))
    {
      majorsArrKey.push(classesList[i].subjectDescription)
    }  
  }
}


//Code for showing dropdown

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById("dropdownContainerDiv")

    dropdown.addEventListener("click", function(){
      //setting majorArrKey[]
        if(majorsArrKey.length == 0)
          setMajorsKey()
      
        
        const dropdownUI = document.getElementById("dropDown")
        dropdownUI.style.display = "block"
        dropdown.style.display = "block"    
        updateValue()
    })
})



//Code for hiding dropdown

window.addEventListener('click', function(e){   
    if (document.getElementById('dropdownContainerDiv').contains(e.target)){
      // Clicked in box
    }else{
      hideDropDown() 
    }
  });

function hideDropDown()
{
  const dropdown = document.getElementById("dropdownContainerDiv")
  const dropdownUI = document.getElementById("dropDown")
  dropdownUI.style.display = "none"
  dropdown.style.display = "inline-block"
}

function isValEmpty(id)
{
  if(document.getElementById(id).value == '')
    return true
  else
    return false
}



function updateValue()
{ 
  var targetNum = 0  
  var getInput = document.getElementById("studyInput").value
  getInput = String(getInput).toUpperCase()
  targetNum = setDropdown(getInput)


  //removes the number of elements that do not have the substring
  const elements1 = document.querySelectorAll(`[id^="a"]`)
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
    //if the entry is a substring and the input is not empty, an element is created
    if (majorsArr[i].includes(fieldOfStudy) && !isValEmpty('studyInput'))
    {
      addDropDown(majorsArr[i],majorsArrKey[i])
      count++
    } 

  }
  return count
}

function addDropDown(fieldOfStudy,key)
{
  const dropdownUI = document.getElementById("dropDown")
  const aElement = document.createElement("a")
  aElement.id = "a"
  aElement.data = key
  const text = document.createTextNode(fieldOfStudy)
  aElement.appendChild(text)
  aElement.addEventListener("click", function(){
    selection(aElement.data,aElement.text)


  })
  dropdownUI.insertAdjacentElement("beforeend",aElement)

}


function selection(data,text)
{
    console.log(data)
    const element = document.getElementByData
    document.getElementById("studyInput").value = text
}