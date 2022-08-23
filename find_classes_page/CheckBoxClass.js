//Not in use
class campusForm{

    constructor(campus,container,requirementObj)
    {
        this.campus = campus
        this.container = container
        this.requirementObj = requirementObj
        this.isClicked = false
        this.createCheckBox()
    }


    createCheckBox()
    {
        //campusDescription
        var checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.id = this.campus
        checkbox.value = this.campus
        this.addEventListener(checkbox)


 
        var label = document.createElement('label')
        label.htmlFor = checkbox.id
        label.appendChild(document.createTextNode(this.campus))
        
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
            this.isClicked = !this.isClicked
            if (this.isClicked)
                this.requirementObj.addCampusReq(this.campus)
            if (!this.isClicked)
                this.requirementObj.removeCampusReq(this.campus)
            // this.requirementObj.addQueryRequirementDays(this.dayNum)
            update_section_display()
        })
    }
}



document.addEventListener("DOMContentLoaded", function()
{
    var campusArr = ["Main","Florence"]
    var campusMemAdr = []
    for (var i = 0; i < campusArr.length; ++i)
    {
        var campus = new campusForm(campusArr[i],"campus_checkbox_container",requirement)
        campusMemAdr.push(campus)
    }
        
    //     console.log("ja")
    // }    
})