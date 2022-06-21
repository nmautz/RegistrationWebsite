// //Specific case where two arrays are used for the dropdown


//set up

var majorsArr = []
//stores text document with majors for dropdown in majorsArray[]
fetch("DropDown/listOfMajors.txt").then(response => response.text()).then(function(listOfMajorsData){
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
    setMajorsKey()
    setSubjectKey()
})

var testKey = []
//called at the end of fetch (above)
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


var subjectKey = []
function setSubjectKey()
{
  for (var i = 0; i < classesList.length; ++i)
  {
    if (!subjectKey.includes(classesList[i].subject))
    {
      subjectKey.push(classesList[i].subject)
    }  
  }
}




//actual dropdown code
document.addEventListener("DOMContentLoaded", function(){
    const element = document.getElementById("subject-input")
    element.addEventListener('keyup', function()
    { 
        var targetNum = 0  
        var getInput = document.getElementById("subject-input").value
        getInput = String(getInput).toUpperCase()

        targetNum = setDropdown(getInput)


        //removes the number of elements that do not have the substring
        const elements1 = document.querySelectorAll(`[id^="a"]`)
        for (var i = 0; i < elements1.length - targetNum; ++i)
        {
            const element = document.getElementById("a")
            element.remove()
        }

    })  
})


function updateValue()
{
    var targetNum = 0  
    var getInput = document.getElementById("subject-input").value
    getInput = String(getInput).toUpperCase()

    targetNum = setDropdown(getInput)


    //removes the number of elements that do not have the substring
    const elements1 = document.querySelectorAll(`[id^="a"]`)
    for (var i = 0; i < elements1.length - targetNum; ++i)
    {
        const element = document.getElementById("a")
        element.remove()
    }
   
  const dropdownUI = document.getElementById("dropDownSubject")
  dropdownUI.style.display = "block"
}

function setDropdown(fieldOfStudy)
{
  var count = 0
  for(var i = 0; i < majorsArr.length; ++i)
  {
    //if the entry is a substring and the input is not empty, an element is created
    if ((majorsArr[i].includes(fieldOfStudy) || subjectKey[i].includes(fieldOfStudy)) && !isValEmpty("subject-input"))
    {
      addDropDown(majorsArr[i],majorsArrKey[i])
      count++
    }

  }
  return count
}

function addDropDown(fieldOfStudy,key)
{
  const dropdownUI = document.getElementById("dropDownSubject")
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


function isValEmpty(id)
{
  if(document.getElementById(id).value == '')
    return true
  else
    return false
}

function selection(data,text)
{
    console.log(data)
    document.getElementById("subject-input").value = text
}

