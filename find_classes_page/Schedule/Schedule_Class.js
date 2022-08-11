//global variable created bellow class creation
class Schedule {
    constructor(insertPoint)
    {
        this.insertPoint = insertPoint
        this.timeContainer = "timeContainer"
        this.classListContainer = "classList-container"
        this.colorInd = 0
    }

    //can only be called once page is loaded
    createSchedule()
    {
        var tasks = [];
        generate(tasks)
    }

    updateSchedule()
    {

        this.generateTasks()
        this.generateClasses()
    }



    generateTasks()
    {
        
        this.colorInd = 0
        var classes = load_classes(this.selectedPlan)
        var tasks = []
  

        for (var i = 0; i < classes.length; ++i)
        {
            tasks = this.convertToTasks(classes[i],tasks)
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
            var duration = (this.getTime(section.endTime[0])  - this.getTime(section.beginTime[0]))
        
            var task = 
            {
                // startTime: section.beginTime[0] / 100,
                startTime: this.getTime(section.beginTime[0]),
                startTimeUnMod: section.beginTime[0],
                endTimeUnMod: section.endTime[0],
                duration: duration,
                column: meetingDays[i],
                id: section.id,
                timeString: parse_time(section.beginTime[0])  + "-" + parse_time(section.endTime[0]),
                professor: section.professorName,
                title: section.courseTitle,    
                backgroundColor: section.color, 
                overlaps: section.overlaps
                // backgroundColor: String(this.taskBackgroundColor[this.colorInd])
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
            if (minutes < 10)
            {
                 minutes = "0" + minutes
            }
               

        }
        time = hours + minutes
        time /= 100
        time -= 0.06
        return time
    }

    generateClasses()
    {
        //clears container div
        var divElement = document.getElementById(this.classListContainer)
        while(divElement.firstChild){
            divElement.removeChild(divElement.firstChild)
            this.colorInd--
        }

        this.colorInd = 0
        var classes = load_classes(this.selectedPlan)
        for (var i = 0; i < classes.length; ++i)
        {
            this.addClass(this.classListContainer,classes[i])
        }
    }

    addClass(container,section)
    {
        var insertPoint = document.getElementById(container)
        const divElement = document.createElement("div")
        divElement.className += "classInfo"
        const headerElement = document.createElement("h3")
        headerElement.innerHTML = section.courseTitle
        const professor = document.createElement("div")
        professor.innerHTML = section.professorName
        const time = document.createElement("div")
        time.innerHTML = parse_time(section.beginTime[0])  + "-" + parse_time(section.endTime[0])
        const colorCode = document.createElement("div")
        colorCode.innerHTML = "*"
        colorCode.style.color = section.color
        colorCode.style.backgroundColor = section.color
        const meetingDays = document.createElement("div")
        meetingDays.innerHTML = requirement.getWeekString(section)
        var deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "Remove"
        deleteBtn.data = section.id
        deleteBtn.addEventListener("click", (e)=>
        {
            remove_class_by_ID(schedule.selectedPlan,deleteBtn.data)
            schedule.updateSchedule()
            update_section_display()
        })

        divElement.appendChild(colorCode)
        divElement.appendChild(headerElement)
        divElement.appendChild(professor)
        divElement.appendChild(meetingDays)
        divElement.appendChild(time)
      
        divElement.appendChild(deleteBtn)

        insertPoint.appendChild(divElement)
        var br = document.createElement("br")
        insertPoint.appendChild(br)
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
                    schedule.updateSchedule()
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
                    schedule.updateSchedule()
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
           delete_plan(schedule.selectedPlan)
           schedule.selectedPlan = "(None)"
           document.getElementById("selectPlanBtn").innerHTML = "Select Plan"
           document.getElementById(this.btnName).style.display = "none"
           update_section_display()
           schedule.updateSchedule()
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


