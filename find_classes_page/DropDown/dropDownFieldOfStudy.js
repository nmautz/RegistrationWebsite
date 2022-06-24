
// // //Specific case where two arrays are used for the dropdown


// //set up

// var majorsArr = []
// //stores text document with majors for dropdown in majorsArray[]
// fetch("DropDown/listOfMajors.txt").then(response => response.text()).then(function(listOfMajorsData){
//     if(majorsArr.length == 0)
//     {
//         var major = ""
//         for (var i = 0; i <= listOfMajorsData.length; ++i)
//         { 
//             if(listOfMajorsData[i] == "\n")
//             {
//             majorsArr.push(major)
//             major = ""
//             }else
//             {
//             major += listOfMajorsData[i]
//             }
//         }
//     }
//   setMajorsKey()
//   setSubjectKey()
// })

// var testKey = []
// //called at the end of fetch (above)
// var majorsArrKey = []
// function setMajorsKey()
// {
//   for (var i = 0; i < classesList.length; ++i)
//   {
    
//     if (!majorsArrKey.includes(classesList[i].subjectDescription))
//     {
//       majorsArrKey.push(classesList[i].subjectDescription)
//     }  
//   }
// }


// var subjectKey = []
// function setSubjectKey()
// {
//   for (var i = 0; i < classesList.length; ++i)
//   {
//     if (!subjectKey.includes(classesList[i].subject))
//     {
//       subjectKey.push(classesList[i].subject)
//     }  
//   }
// }
=======
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

  Load_Queue.addToQueue("/classes.json", function(jsonData){
    var classesList = jsonData["data"]

    for (var i = 0; i < classesList.length; ++i)
    {
      
      if (!majorsArrKey.includes(classesList[i].subjectDescription))
      {
        majorsArrKey.push(classesList[i].subjectDescription)
      }  
    }
  })
}



var subjectKey = []
function setSubjectKey()
{
  Load_Queue.addToQueue("/classes.json", function(jsonData){
    var classesList = jsonData["data"]

    for (var i = 0; i < classesList.length; ++i)
    {
      if (!subjectKey.includes(classesList[i].subject))
      {
        subjectKey.push(classesList[i].subject)
      }  
    }
  })
}