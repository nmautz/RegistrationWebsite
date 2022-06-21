fetch("../classes.json").then(response => response.json()).then( function(jsonData){
    classesList = jsonData["data"]
  })




var subjectArr = []
var subjectDescriptionArr = []
var courseNumber = []
var courseTitle = []

var keyArray = [subjectArr,subjectDescriptionArr,courseNumber,courseTitle]
//called in dropDown class setListener()
function setKeys()
{
    if (subjectArr.length == 0)
    {
        for (var i = 0; i < classesList.length; ++i)
        {
            if (!subjectArr.includes(classesList[i].subject))
                subjectArr.push(classesList[i].subject)
                
            if (!subjectDescriptionArr.includes(classesList[i].subjectDescription))
                subjectDescriptionArr.push(classesList[i].subjectDescription)

            if (!courseNumber.includes(classesList[i].courseNumber))
                courseNumber.push(classesList[i].courseNumber)

            if (!courseTitle.includes(classesList[i].courseTitle))
                courseTitle.push(classesList[i].courseTitle)
        }

        for (var i = 0; i < keyArray.length; ++i)
            keyArray[i].sort()
    }
    
}



class dropDown {
    constructor(input,array,elementName,requirementsObj)
    {
        this.input = input
        this.array = array
        this.elementName = elementName
        this.divName = String(elementName + "DropdownDiv")
        this.requirementsObj = requirementsObj
        this.addDropdownDiv()
        this.setListeners()
    }


    addDropdownDiv()
    {
        const dropdownUI = document.getElementById(this.input)
        const element = document.createElement("div")
        element.id = this.divName
        //css class that the dropdown follows**************************
        element.classList.add("dropdown-content")
        dropdownUI.insertAdjacentElement("afterend",element)
        
    }


    setListeners() 
    {
        const inputElement = document.getElementById(this.input)
        inputElement.addEventListener('keyup', (e) =>
        {
            setKeys()
            var userInput = document.getElementById(this.input).value
            userInput = String(userInput).toUpperCase()
            this.checkHideDropdown()
            this.updateDropDown(userInput)
        })

        inputElement.addEventListener("click", (e) =>
        {
            this.checkHideDropdown()
        })
    }


    //decides if the dropdown should be hidden or not
    checkHideDropdown()
    {
        const dropdownUI = document.getElementById(this.divName)
        if (document.getElementById(this.input).value != "")                     
            dropdownUI.style.display = "inline-block"
        else
            dropdownUI.style.display = "none"
        window.addEventListener('click', (e) =>
        {   
            if (document.getElementById(this.input).contains(e.target)){
            // Clicked in box
                if (document.getElementById(this.input).value != "")                     
                    dropdownUI.style.display = "inline-block"
                else
                    dropdownUI.style.display = "none"
            }else{
                dropdownUI.style.display = "none"
            }
        });

    }


    updateDropDown(userInput)
    {
        this.clearChildren()
        this.addChildren(userInput)
        
    }

    addChildren(userInput)
    {
        for(var i = 0; i < this.array.length; ++i)
        {
            var index = String(this.array[i]).toUpperCase()
            if (index.includes(userInput))
            {
                this.addDropdown(this.array[i])
            }
        }
    }

    addDropdown(data)
    {
        const dropdownUI = document.getElementById(this.divName)
        const aElement = document.createElement("a")
        aElement.id = this.elementName
        aElement.data = data
        const text = document.createTextNode(data)
        aElement.appendChild(text)
        aElement.addEventListener("click", (e) =>
        {
            document.getElementById(this.input).value = data


        })
        dropdownUI.insertAdjacentElement("beforeend",aElement)
    }

    clearChildren()
    {
        var divElement = document.getElementById(this.divName)
        while(divElement.firstChild){
            divElement.removeChild(divElement.firstChild)
        }
    }

}

document.addEventListener("DOMContentLoaded", function()
{
    const text = new class_search_query()
    text.printRequirements()
    const drop = new dropDown("courseNumber-input",courseNumber,"courseNumber")
    const drop2 = new dropDown("courseTitle-input",courseTitle,"courseTitle")
})

