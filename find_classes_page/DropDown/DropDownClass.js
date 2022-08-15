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
        this.setInputCSS()
        this.addDropdownDiv()
        this.addClearButton()
        this.setListeners()
    }

    clearInput()
    {
        var input = document.getElementById(this.input)
        input.value = ""
    }
    setInputCSS()
    {
        //css class that the input follows**************************
        const dropdownUI = document.getElementById(this.input)
        dropdownUI.classList.add("dropdown")
    }
    
    addClearButton()
    {
        const dropdownUI = document.getElementById(this.input)
        const element = document.createElement("INPUT")
        element.setAttribute("type", "button")
        element.value = "x"
        element.id = String(this.elementName + "Button")
        //css class that the button follows**************************
        element.classList.add("dropdown")
        element.classList.add("clearBtn")
        element.addEventListener("click", (e) =>
        {
            if(!requirement.isEmpty())
            {
                dropdownUI.value = ""
                this.updateDropDown()
                update_section_display()
            }
        })
        dropdownUI.insertAdjacentElement("afterend",element)
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
        
        const dropdownUI = document.getElementById(this.divName)
        window.addEventListener('click', (e) =>
        {   
            if (document.getElementById(this.input).contains(e.target))
                dropdownUI.style.display = "inline-block"
            else
                dropdownUI.style.display = "none"
        });
    }


    //decides if the dropdown should be hidden or not
    checkHideDropdown()
    {
        const dropdownUI = document.getElementById(this.divName)
        if (document.getElementById(this.input).value != "")                     
            dropdownUI.style.display = "inline-block"
        else
            dropdownUI.style.display = "none"
    }


    updateDropDown()
    {
        this.clearChildren()
        this.addChildren()
    }

    addChildren()
    {
        var userInput = document.getElementById(this.input).value
        userInput = String(userInput).toUpperCase()

        //checks the json
        this.requirementsObj.addQueryRequirement(userInput,this.requirementNum)
        var dropDownArr = []
        for(var i = 0; i < classesList.length; ++i)
        {
            if(this.requirementsObj.meetsRequirements(classesList[i]))
            {            
                var text = this.requirementsObj.getClassesListString(classesList[i],this.requirementNum)
                for (var j = 0; j < text.length; ++j)
                {
                    if (!dropDownArr.includes(String(text[j])) && text[j] != '')
                        dropDownArr.push(String(text[j]))
                

                }
            }            
        }

        //adds the drop downs
        dropDownArr.sort()
        for (var i = 0; i < dropDownArr.length; ++i)
            this.addDropdown(dropDownArr[i])
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
            update_section_display()
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

class daysDropDown extends dropDown {
    constructor(input,elementName,requirementsObj,requirementNum)
    {
        super(input,elementName,requirementsObj,requirementNum)
        this.inputVal = ""
        //used for hiding the dropdown
        this.isClicked = false
    }

    clearInput()
    {
        document.getElementById(this.input).value = "Meeting Day(s)"
    }

    //clicking on button will clear the restrictions on the dropdown
    //restrictions are only added when dropdown is clicked
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
            this.inputVal = ""
            this.checkHideDropdown()
            this.updateDropDown()  
        })
    }

    addDropdownDiv()
    {
        const dropdownUI = document.getElementById(this.input)
        const element = document.createElement("div")
        element.id = this.divName
        //css class that the dropdown follows**************************
        element.classList.add("dropdown-content")
        element.classList.add("button-dropdown")
        dropdownUI.insertAdjacentElement("afterend",element)
    }

    addClearButton()
    {
    }

    addChildren()
    {
        //var userInput = document.getElementById(this.input).value
        var userInput = this.inputVal
        userInput = String(userInput).toUpperCase()

        //checks the json
        this.requirementsObj.addQueryRequirement(userInput,this.requirementNum)
        var dropDownArr = []
        for(var i = 0; i < classesList.length; ++i)
        {
            if(this.requirementsObj.meetsRequirements(classesList[i]))
            {            
                var text = this.requirementsObj.getClassesListString(classesList[i],this.requirementNum)
                for (var j = 0; j < text.length; ++j)
                {
                    if (!dropDownArr.includes(String(text[j])) && text[j] != '')
                        dropDownArr.push(String(text[j]))
                

                }
            }            
        }

        //adds the drop downs
        this.addDropdown("(None)")
        dropDownArr.sort()
        for (var i = 0; i < dropDownArr.length; ++i)
            this.addDropdown(dropDownArr[i])
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
            document.getElementById(this.input).value = "Meeting Day(s) :" + data
            // this.isClicked = !this.isClicked
            this.inputVal = data
            if (data == "(None)")
            {
                 this.inputVal = ""  
                 document.getElementById(this.input).value = "Meeting Day(s)"
            }else
                document.getElementById(this.input).value = "Meeting Day(s) :" + data
                

            //makes dropdown update after it is clicked on
            this.updateDropDown()
            update_section_display()
        })
        dropdownUI.insertAdjacentElement("beforeend",aElement)
    }

    setListeners() 
    {
        const inputElement = document.getElementById(this.input)
        inputElement.addEventListener('keyup', (e) =>
        {
            this.checkHideDropdown()
            this.updateDropDown()
        })

        const dropdownUI = document.getElementById(this.divName)
        inputElement.addEventListener("click", (e) =>
        {

            this.inputVal = ""
            this.checkHideDropdown()
            this.updateDropDown()  
           
        })

        window.addEventListener('click', (e) =>
        {   
            if (document.getElementById(this.input).contains(e.target))
            {
                this.isClicked = !this.isClicked
                if(this.isClicked)
                    dropdownUI.style.display = "inline-block"
                else
                    dropdownUI.style.display = "none"
            }else
            {
                this.isClicked = false
                dropdownUI.style.display = "none"
            }
        });
    }

    checkHideDropdown()
    {
        const dropdownUI = document.getElementById(this.divName)
        if (this.inputVal != "")                     
            dropdownUI.style.display = "inline-block"
        else
            dropdownUI.style.display = "none"
    }
}

//gets filled when dropdowns are dynamically created at DOMContentLoaded
var inputArray = []
function clearReq()
{   

    for (var i = 0; i < inputArray.length; ++i)
        inputArray[i].clearInput()
    
    //clears time interval
    clearSlider(2)
    requirement.clearReq()
    update_section_display()
}
const requirement = new class_search_query()

document.addEventListener("DOMContentLoaded", function()
{
    
    //creating drop downs
    const drop2 = new dropDown("subjectDescription-input","courseSubjectDescription",requirement,1)
    const drop3 = new dropDown("courseNumber-input","courseNumber",requirement,2)
    const drop4 = new dropDown("courseTitle-input","courseTitle",requirement,3)
    const drop5 = new dropDown("professorName-input","professorName",requirement,4)
    const drop6 = new dropDown("courseAttributes-input","courseAttributes",requirement,5)
    const drop7 = new daysDropDown("meetingDays-input","meetingDays",requirement,-1)

    inputArray = [drop2,drop3,drop4,drop5,drop6,drop7]

})

