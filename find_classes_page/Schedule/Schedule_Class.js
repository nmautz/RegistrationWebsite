//global variable created bellow class creation
class Schedule {
    constructor(insertPoint)
    {
        this.insertPoint = insertPoint
        this.timeContainer = "timeContainer"
        this.selectedPlan = ""
    }

    createBlankSchedule()
    {
        this.createEmptyTimeContainer()
    
    }

    createEmptyTimeContainer()
    {
        this.createContainer(this.insertPoint,this.timeContainer,"N/A")
        var weekDayTitles = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        for (var i = 0; i < 7; i++)
        {
            
            this.createContainer(this.timeContainer,weekDayTitles[i],"N/A")
            for(var j = 0; j < 96; j++)
            {
                this.createContainer(weekDayTitles[i],j*30,"N/A")
            }
            console.log("***********")
        }
    }
    
    createContainer(instPnt,id,css)
    {
        const dropdownUI = document.getElementById(instPnt)
        const element = document.createElement("div")
        element.id = id
        //css class that the dropdown follows**************************
        element.classList.add(css)
        dropdownUI.appendChild(element)
    }
    loadSchedule(planID)
    {
        var classes = load_classes(planID)
        console.log("*********")
        for (var i = 0; i < classes.length; ++i)
        {
            console.log(classes[i])
        }
        console.log("*********")
    }
}

class ScheduleInput{
    constructor(insertPoint)
    {
        this.insertPoint = insertPoint
        this.submissionDiv = "submitPlanContainer"
        this.addPlanBtn = "addPlanBtn"
        this.planIdInput = "planID-Input"
        this.createButton()
        this.createHidElements()

    }

    createButton()
    {
        //creating button
        const btnElement = document.createElement("input")
        btnElement.setAttribute("type", "button")
        btnElement.value = "Add Plan"
        btnElement.id = this.addPlanBtn
        btnElement.addEventListener("click", (e)=>
        {
            var subDiv = document.getElementById(this.submissionDiv)
            e.target.style.display = "none"
            subDiv.style.display = "block"   
        
        })
        const divElement = document.getElementById(this.insertPoint)
        divElement.appendChild(btnElement)
    }

    createHidElements()
    {  
        //creating input
        const inputElement = document.createElement("input")
        inputElement.id = this.planIdInput
        inputElement.placeholder = "Enter Plan Name"

        //creating button
        const btnElement = document.createElement("input")
        btnElement.setAttribute("type", "button")
        btnElement.value = "Create"
        btnElement.id = "submitNewPlanBtn"
        btnElement.addEventListener("click", (e)=>
        {
            var plan = document.getElementById(this.planIdInput)
            if(plan.value == "")
            {
                var charCode = 65
                var planName = "A"
                const ids = load_planIDs()
                for (var i = 0; i < ids.length; ++i)
                {
                    if (ids[i] == planName)
                    {
                        charCode++
                        planName = planName.fromCharCode(charCode)
                    }
                    console.log(planName)
                }
                schedule.selectedPlan = planName
            }else
            {
                schedule.selectedPlan = plan.value
                plan.value = ""
                console.log(schedule.selectedPlan)
                var subDiv = document.getElementById(this.submissionDiv)
                subDiv.style.display = "none"
                var addBtn = document.getElementById(this.addPlanBtn)
                addBtn.style.display = "block"  
            }

        })

        const divElement = document.createElement("div")
        divElement.id = this.submissionDiv
        //hides div element
        divElement.style.display = "none"
        //css class that the dropdown follows**************************
        // divElement.classList.add(css)

        //appending the button and input to the div container
        divElement.appendChild(inputElement)
        divElement.appendChild(btnElement)

        //appending div container to main div container
        const mainContainer = document.getElementById(this.insertPoint)
        mainContainer.appendChild(divElement)
    }
}

class planDropDown extends daysDropDown{
    constructor(input)
    {
        super(input,"PlanDropDown")
    }


    addDropdownDiv()
    {
        const dropdownUI = document.getElementById(this.input)
        const element = document.createElement("div")
        element.id = this.divName
        //css class that the dropdown follows**************************
        element.classList.add("dropdown-content")
        element.classList.add("button-dropdown")
        element.classList.add("plan")
    
        dropdownUI.insertAdjacentElement("afterend",element)
    }

    addChildren()
    {
        //var userInput = document.getElementById(this.input).value
        var userInput = this.inputVal
        userInput = String(userInput).toUpperCase()
        var planIDs = load_planIDs()
        var dropDownArr = []
        for(var i = 0; i < planIDs.length; ++i)
        {
            dropDownArr.push(planIDs[i])    
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
            schedule.selectedPlan = data
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
}


const schedule = new Schedule("scheduleInput")

document.addEventListener("DOMContentLoaded", function()
{
    const scheduleInput = new ScheduleInput("plan_Input_Container")
    const planDrpDwn = new planDropDown("selectPlanBtn","selectPlan",requirement,-1)
    schedule.createBlankSchedule()

    
})


