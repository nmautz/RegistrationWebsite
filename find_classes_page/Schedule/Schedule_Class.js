//global variable created bellow class creation
class Schedule {
    constructor(insertPoint)
    {
        this.insertPoint = insertPoint
        this.timeContainer = "timeContainer"
        this.selectedPlan = "(None)"
    }

    //can only be called once page is loaded
    createSchedule()
    {
        var tasks = [];
        generate(tasks)
    }

    updateSchedule()
    {
        var classes = load_classes(this.selectedPlan)
        var tasks = []
        for (var i = 0; i < classes.length; ++i)
        {
            tasks = this.convertToTasks(classes[i],tasks)
            // tasks.push(task)
        }
        
        generate(tasks)
    }

    convertToTasks(section,tasks)
    {
        
        var week_days = [section.sunday, section.monday, section.tuesday, section.wednesday, section.thursday, section.friday, section.saturday]
        var meetingDays = []
        for (var i = 0; i < week_days.length; ++i)
        {
            if (week_days[i][0])
                meetingDays.push(i)
        }

        for (var i = 0; i < meetingDays.length; ++i)
        {
            // var duration = (section.endTime[0] - section.beginTime[0]) /100
            var duration = (this.getTime(section.endTime[0])  - this.getTime(section.beginTime[0])) /100
            // console.log(section.beginTime[0])
            // console.log(this.getTime(section.beginTime[0]))
            // console.log(duration)
            var task = 
            {
                // startTime: section.beginTime[0] / 100,
                startTime: this.getTime(section.beginTime[0]),
                endTime: this.getTime(section.endTime[0]),
                duration: duration,
                column: meetingDays[i],
                id: section.courseTitle,
                // id: Math.ceil(Math.random() * 100000),
                title: parse_time(section.beginTime[0])  + "-" + parse_time(section.endTime[0]),    
                courseID: section.id
            }
            tasks.push(task)
        }
  
        return tasks
    }

    getTime(time)
    {
        var hours = time[0] + time[1]
        var minutes = time[2] + time[3]

        if (minutes != "00")
        {
            minutes = minutes * 10 / 6
            if (minutes.length < 2)
                minutes = "0" + minutes
        }
        time = hours + minutes
        time /= 100
        return time
    }

}

class ScheduleInput{
    constructor(insertPoint, deletePlnBtn)
    {
        this.insertPoint = insertPoint
        this.deletePlnBtn = deletePlnBtn
        this.submissionDiv = "submitPlanContainer"
        this.addPlanBtn = "addPlanBtn"
        this.planIdInput = "planID-Input"
        this.submitPlanBtn = "submitNewPlanBtn"
        this.createButton()
        this.addListener()
        this.createHidElements()

    }

    addListener()
    {
        window.addEventListener('click', (e) =>
        {   
            const divElement = document.getElementById(this.submissionDiv)
            const addPlanBtn = document.getElementById(this.addPlanBtn)
            if (document.getElementById(this.planIdInput).contains(e.target))
                divElement.style.display = "inline-block"
            else if (!addPlanBtn.contains(e.target))
            {
                divElement.style.display = "none"
                addPlanBtn.style.display = "block"
            }
                
        });
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
        btnElement.id = this.submitPlanBtn
        btnElement.addEventListener("click", (e)=>
        {
            var plan = document.getElementById(this.planIdInput)
            var hide = true
            if(plan.value == "")
            {
                var charCode = 65
                var planName = "A"
                const ids = get_plan_IDs()
                if(ids == null)
                {
                    create_plan("A")
                    schedule.selectedPlan = "A"
                }
                else{
                    while(is_plan_saved(planName))
                    {
                        charCode++
                        planName = String.fromCharCode(charCode)
                    }
                    create_plan(planName)
                    schedule.selectedPlan = planName
                }
                
            }else
            {
                if (is_plan_saved(plan.value))
                {
                    alert("Plan Already Created")
                    hide = false
                }else
                {  
                    create_plan(plan.value)
                    schedule.selectedPlan = plan.value
                }                
            }
            
            if(hide)
            {
                document.getElementById("selectPlanBtn").innerHTML = "Selected Plan: " + schedule.selectedPlan
                plan.value = ""
                var subDiv = document.getElementById(this.submissionDiv)
                subDiv.style.display = "none"
                var addBtn = document.getElementById(this.addPlanBtn)
                addBtn.style.display = "block"
                this.deletePlnBtn.unhide()  
                update_section_display() 
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
    constructor(input,deletePlnBtn)
    {
        super(input,"PlanDropDown")
        this.deletePlnBtn = deletePlnBtn
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
        var planIDs = get_plan_IDs()
        if (planIDs == null)
        {
            this.addDropdown("(None)")
            return
        }
         
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
            this.deletePlnBtn.planID = data

            document.getElementById(this.input).innerHTML = "Selected Plan: " + data
            if (data == "(None)")
            {
                document.getElementById(this.input).innerHTML = "Select Plan"
                this.deletePlnBtn.hide()
            }else
            {
                this.deletePlnBtn.unhide()
            }        
            

            //makes dropdown update after it is clicked on
            this.updateDropDown()
            schedule.updateSchedule()
            update_section_display()
        })
        dropdownUI.insertAdjacentElement("beforeend",aElement)
    }

    resetInnerHTML()
    {
        document.getElementById(this.input).innerHTML = "Select Plan"
    }
}

class deletePlanBtn {
    constructor(insertPoint)
    {
        this.insertPoint = insertPoint
        this.btnName = "deletePlanBtn"
        this.planID = "(None)"
        this.createButton()
        this.hide()
    }

    createButton()
    {
        const btnElement = document.createElement("input")
        btnElement.setAttribute("type", "button")
        btnElement.value = "Delete"
        btnElement.id = this.btnName
        btnElement.addEventListener("click", (e)=>
        {
           delete_plan(this.planID)
           schedule.selectedPlan = "(None)"
           this.planID = "(None)"
           document.getElementById("selectPlanBtn").innerHTML = "Select Plan"
           document.getElementById(this.btnName).style.display = "none"
           update_section_display()
        })
            
        var insertDiv = document.getElementById(this.insertPoint)
        insertDiv.appendChild(btnElement)
    }

    hide()
    {
        var btn = document.getElementById(this.btnName)
        btn.style.display = "none"
    }

    unhide()
    {
        var btn = document.getElementById(this.btnName)
        btn.style.display = "block"
    }

}


const schedule = new Schedule("scheduleInput")

document.addEventListener("DOMContentLoaded", function()
{
    const deletePlnBtn = new deletePlanBtn("delete_Plan_Container")    
    const scheduleInput = new ScheduleInput("plan_Input_Container",deletePlnBtn)
    const planDrpDwn = new planDropDown("selectPlanBtn",deletePlnBtn) 
    schedule.createSchedule()
})


