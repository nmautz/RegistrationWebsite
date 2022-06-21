fetch("../classes.json").then(response => response.json()).then( function(jsonData){
    classesList = jsonData["data"]
  })



class dropDown {
    constructor(input,elementName,requirementsObj,requirementNum)
    {
        this.input = input
        this.elementName = elementName
        this.divName = String(elementName + "DropdownDiv")
        this.requirementsObj = requirementsObj
        this.requirementNum = requirementNum
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
            this.checkHideDropdown()
            this.updateDropDown()
        })

        inputElement.addEventListener("click", (e) =>
        {
            this.checkHideDropdown()
            this.updateDropDown()
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
            if (document.getElementById(this.input).contains(e.target))
            {
            // Clicked in box
                dropdownUI.style.display = "inline-block"
            }else{
                dropdownUI.style.display = "none"
            }
        });

    }


    updateDropDown()
    {
        this.clearChildren()
        this.addChildren()
        
    }

    addChildren()
    {
        var dropDownArr = []
        var userInput = document.getElementById(this.input).value
        userInput = String(userInput).toUpperCase()
        this.requirementsObj.addQueryRequirement(userInput,this.requirementNum)
        for(var i = 0; i < classesList.length; ++i)
        {
            if(this.requirementsObj.meetsRequirements(classesList[i]))
            {              
               var text = this.requirementsObj.getClassesListString(classesList[i],this.requirementNum)
               
               if (!dropDownArr.includes(text))
               {
                    dropDownArr.push(text)
                    this.addDropdown(text)
               }
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
            this.requirementsObj.addQueryRequirement(data,this.requirementNum)
            //makes dropdown update after it is clicked on
            this.updateDropDown()
            
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
    const requirement = new class_search_query()
    // const drop1 = new dropDown("subject-input2","courseSubject",requirement,0)
    const drop2 = new dropDown("subjectDescription-input","courseSubjectDescription",requirement,1)
    const drop3 = new dropDown("courseNumber-input","courseNumber",requirement,2)
    const drop4 = new dropDown("courseTitle-input","courseTitle",requirement,3)
})

