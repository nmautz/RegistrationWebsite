class mainSearch extends dropDown{
    constructor(input,elementName,requirementsObj,requirementNum)
    {
        super(input,elementName,requirementsObj,requirementNum)
        this.inputVal = ""
      
    }

    addChildren()
    {
        var userInput = document.getElementById(this.input).value
        userInput = String(userInput).toUpperCase()

        //checks the json
        // this.requirementsObj.addQueryRequirement(userInput,this.requirementNum)
        var dropDownArr = []

        var elementNames = ["Course Titles","Professors","Attributes","Subject Descriptions"]
        var requirements = [3,4,5,1]
        var elementContainer = new Array(elementNames.length)
        for (var i = 0; i < elementContainer.length; ++i)
            elementContainer[i] = new Array
        

        for(var i = 0; i < classesList.length; ++i)
        {
            var elements = [classesList[i].subject + " " + classesList[i].courseNumber + " - " + classesList[i].courseTitle,classesList[i].professorName,classesList[i].attributeDesc,classesList[i].subjectDescription]
            for (var j = 0; j < elements.length; ++j)
            {
                
                var text = String(elements[j]).toUpperCase()
                if(elementNames[j] == "Attributes")
                {
                    var textArr = String(elements[j])
                    // console.log(elementContainer[i][j])
                    var tempArr = textArr.split(',')
                    for (var x = 0; x < tempArr.length; ++x)
                    {   
                        var indexVal = String(tempArr[x]).toUpperCase()
                        if (indexVal.includes(userInput))
                        {
                            if (!elementContainer[j].includes(tempArr[x]))
                                elementContainer[j].push(tempArr[x]) 
                        }     
                    }
                       
                }else if (text.includes(userInput))
                {
                    var checkVal = String(elementContainer[j]).toUpperCase()
                    if (!checkVal.includes(text))
                        elementContainer[j].push(elements[j])
                }
            }      
        }
        
        for (var i = 0; i < elementContainer.length; ++i)
        {
            if (elementContainer[i].length > 0)
            {
                elementContainer[i].sort()
                this.addTitleDropDown(elementNames[i])
                for (var j = 0; j < elementContainer[i].length; ++j)
                {
                    this.addDropdown(elementContainer[i][j],requirements[i])  
                }
                    
            }
            
        }

    }

    addDropdown(data,key)
    {
        const dropdownUI = document.getElementById(this.divName)
        const aElement = document.createElement("a")
        aElement.id = this.elementName
        aElement.data = data
        const text = document.createTextNode(data)
        aElement.appendChild(text)
        aElement.addEventListener("click", (e) =>
        {
            this.requirementNum = key
            document.getElementById(this.input).value = data
            this.requirementsObj.addQueryRequirement(data,this.requirementNum)
            //makes dropdown update after it is clicked on
            this.updateDropDown()
            update_section_display()
        })
        dropdownUI.insertAdjacentElement("beforeend",aElement)
    }

    addTitleDropDown(title)
    {
        const dropdownUI = document.getElementById(this.divName)
        const element = document.createElement("div")
        element.id = this.elementName
        element.classList.add("dropdown-content-title")
        // aElement.data = data
        const text = document.createTextNode(title)
        element.appendChild(text)
        dropdownUI.insertAdjacentElement("beforeend",element)
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
                clearDropDowns()
                this.updateDropDown()
                update_section_display()
            }
        })
        dropdownUI.insertAdjacentElement("afterend",element)
    }
}