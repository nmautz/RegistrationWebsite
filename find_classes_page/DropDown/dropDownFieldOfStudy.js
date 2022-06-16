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


//actual dropdown code
document.addEventListener("DOMContentLoaded", function(){
    const element = document.getElementById("subject-input")
    element.addEventListener('keyup', function updateValue()
    { 
        console.log("here")
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
    })  



})


