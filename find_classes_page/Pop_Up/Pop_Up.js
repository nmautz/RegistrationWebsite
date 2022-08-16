function open_pop_up(section)
{
    const popUp = document.getElementById("pop_up_window")
    const overlay = document.getElementById("overlay")
    // console.log(sectionID.courseTitle)
    document.getElementById("popUp-title").innerHTML = section.courseTitle + "<span style='font-weight:normal'> | </span>" + section.subject + section.courseNumber + "<span style='font-weight:normal'> | </span>" + section.creditHourSession + " credit hours"
    document.getElementById("popUp-Description").innerHTML = section.description
    document.getElementById("popUp-Professor").innerHTML = section.professorName + " | " + section.professorEmail
    var meetingTimes = parse_time(section.beginTime) + "-" + parse_time(section.endTime)
    document.getElementById("popUp-Meeting-Times").innerHTML = meetingTimes
    var meetingDays = requirement.getWeekString(section)
    document.getElementById("popUp-Meeting-Days").innerHTML = meetingDays
    document.getElementById("popUp-Location").innerHTML = section.campusDescription + " Campus | " + section.buildingDescription
    document.getElementById("popUp-Enrolment").innerHTML = section.enrollment + "/" + section.maximumEnrollment + " | Seats Available: " + section.seatsAvailable
    document.getElementById("popUp-Hours").innerHTML = section.hoursWeek
    document.getElementById("popUp-Attributes").innerHTML = getAttributes(section.attributeDesc)
    document.getElementById("popUp-Prereqs").innerHTML = getPrereqs(section.prereqs)
    document.getElementById("popUp-Coreqs").innerHTML = getPrereqs(section.coreqs)
    document.getElementById("popUp-Restrictions").innerHTML = getPrereqs(section.restrictions)
    
    if (popUp == null)
        return
    popUp.classList.add("active")
    overlay.classList.add("active")
}

function close_pop_up()
{
    const popUp = document.getElementById("pop_up_window")
    const overlay = document.getElementById("overlay")
    if (popUp == null)
        return
    popUp.classList.remove("active")
    overlay.classList.remove("active")
}

window.addEventListener("click", function(event){
    var popUp = this.document.getElementById("overlay")
    if (popUp.contains(event.target))
        close_pop_up()
  });


function getAttributes(attributes)
{
    var text = ""
    for (var i = 0; i < attributes.length; ++i)
    {
        text += attributes[i]
        if (i < attributes.length - 1)
            text += ", "       
    }
    return text
}

function getPrereqs(prereqs)
{
    if (String(prereqs).includes("No prerequisite information available."))
        return "N/A"
    else
        return prereqs
}