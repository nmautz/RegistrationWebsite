class searchElement{
    constructor(name, requirementNum)
    {
        this.name = name
        this.requirementNum = requirementNum
        this.container = []
        this.secondContainer = []
    }
}

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
   
        var elementNames = ["Course Titles","Professors","Attributes","Subject Descriptions"]
        var requirements = [3,4,5,1]

        var searchElements = []
        for (var i = 0; i < elementNames.length; ++i)
            searchElements.push(new searchElement(elementNames[i],requirements[i]))
        

        for(var i = 0; i < classesList.length; ++i)
        {
            if(requirement.meetsCampusReq(classesList[i]))
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
                                if (!searchElements[j].container.includes(tempArr[x]))
                                    searchElements[j].container.push(tempArr[x]) 
                            }     
                        }
                            
                    }else if (text.includes(userInput))
                    {
                        var checkVal = String(searchElements[j].container).toUpperCase()
                        if (!checkVal.includes(text))
                            searchElements[j].container.push(elements[j])
                        
                            
                    }
                }       
            }
           
        }
        
        for (var i = 0; i < searchElements.length; ++i)
        {
            if (searchElements[i].container.length > 0)
            {
                searchElements[i].container.sort()
                this.addTitleDropDown(searchElements[i].name)
                for (var j = 0; j < searchElements[i].container.length; ++j)
                {
                    this.addDropdown(searchElements[i].container[j],searchElements[i].requirementNum,searchElements[i].name)
                }
                    
            }

        }
    }

    addDropdown(data,key,elementName)
    {
        const dropdownUI = document.getElementById(this.divName)
        const aElement = document.createElement("a")
        aElement.id = this.elementName
        aElement.data = data
        const text = document.createTextNode(data)
        aElement.classList.add("main-search-dropdown")
        aElement.appendChild(text)
        aElement.addEventListener("click", (e) =>
        {
            this.requirementNum = key
            document.getElementById(this.input).value = data
            if (elementName == "Course Titles")
                data = this.parseCourseTitle(data," - ")
            this.requirementsObj.addQueryRequirement(String(data).toUpperCase(),this.requirementNum)
            //makes dropdown update after it is clicked on
            // this.updateDropDown()
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
        // aElement.classList.remove("clearBtn")
        element.classList.add("main-Dropdown-btn")
        element.addEventListener("click", (e) =>
        {
            if(!requirement.isEmpty())
            {
                dropdownUI.value = ""
                clearReq()
                this.updateDropDown()
                update_section_display()
            }
        })
        dropdownUI.insertAdjacentElement("afterend",element)
    }

    parseCourseTitle(data,cutOfVal)
    {
        var courseTitle = ""
        var startIndex = data.indexOf(cutOfVal)
        for (var i = startIndex + cutOfVal.length; i < data.length; ++i)
            courseTitle += data[i]
        return String(courseTitle)
    }

    addDropdownDiv()
    {
        const dropdownUI = document.getElementById(this.input)
        const element = document.createElement("div")
        element.id = this.divName
        //css class that the dropdown follows**************************
        element.classList.add("dropdown-content")
        element.classList.add("main-search-dropdown-container")
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
            var val = document.getElementById(this.input).value
            if (document.getElementById(this.input).contains(e.target) && val != "")
                dropdownUI.style.display = "inline-block"
            else
                dropdownUI.style.display = "none"
        });
    }
}