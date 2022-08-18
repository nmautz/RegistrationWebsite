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
        this.requirementsObj.addQueryRequirement(userInput,this.requirementNum)
        var dropDownArr = []

        var elementNames = ["Course Titles","Professors","Attributes","Subject Descriptions"]
        var elementContainer = new Array(elementNames.length)
        for (var i = 0; i < elementContainer.length; ++i)
            elementContainer[i] = new Array
        

        for(var i = 0; i < classesList.length; ++i)
        {
            var elements = [classesList[i].courseTitle,classesList[i].professorName,classesList[i].attributeDesc,classesList[i].subjectDescription]
            for (var j = 0; j < elements.length; ++j)
            {
                var text = String(elements[j]).toUpperCase()
                
                if (text.includes(userInput))
                {
                    if (!elementContainer[j].includes(text))
                        elementContainer[j].push(text)
                }
            }      
        }
        
        for (var i = 0; i < elementContainer.length; ++i)
        {
            if (elementContainer[i] > 0)
            {}
            elementContainer[i].sort()
            this.addDropdown("****" + elementNames[i] + "****")
            for (var j = 0; j < elementContainer[i].length; ++j)
                this.addDropdown(elementContainer[i][j])
        }
            
        

        // adds the drop downs
        dropDownArr.sort()
        for (var i = 0; i < dropDownArr.length; ++i)
            this.addDropdown(dropDownArr[i])
    }
}