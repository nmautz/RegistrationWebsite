//Not in use
class dayForm{

    constructor(text,dayNum,container,requirementObj)
    {
        this.text = text
        this.dayNum = dayNum
        this.container = container
        this.requirementObj = requirementObj
        this.createCheckBox()
    }


    createCheckBox()
    {
        var checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.id = this.text
        checkbox.value = this.text
        this.addEventListener(checkbox)


 
        var label = document.createElement('label')
        label.htmlFor = checkbox.id
        label.appendChild(document.createTextNode(this.text))
        
        // var br = document.createElement('br')

        var boxContainer = document.getElementById(this.container)
        boxContainer.appendChild(checkbox)
        boxContainer.appendChild(label)
        // boxContainer.appendChild(br)
    }

    addEventListener(element)
    {
        element.addEventListener("click", (e) =>
        {
            this.requirementObj.addQueryRequirementDays(this.dayNum)
            update_section_display()
        })
    }
}

function addWeekForm(insertElement,requirement)
{
    var weekArr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    var weekCB = []
    for(var i = 0; i < weekArr.length; ++i)
        weekCB.push(new dayForm(weekArr[i],i,insertElement,requirement))
}