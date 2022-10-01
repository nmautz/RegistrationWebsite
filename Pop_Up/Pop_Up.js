function open_pop_up(section)
{
    // section = [{id: 167139, subject: "RELI", subjectDescription: "RELIGIOUS STUDIES", courseReferenceNumber: "15376", courseNumber: "339", scheduleTypeDescription: "Lecture", courseTitle: "Ignatian Spirituality", maximumEnrollment: 23, enrollment: 25, seatsAvailable: -2, waitCapacity: 0, waitCount: 0, waitAvailable: 0, professorName: "Tran, Quan", professorEmail: "tranq@gonzaga.edu", beginTime: ["0925"], buildingDescription: ["College Hall"], campusDescription: "Main", category: ["01"], creditHourSession: [3.0], endDate: ["12/16/2022"], "endTime": ["1040"], "hoursWeek": [2.5], "room": ["425"], "startDate": ["08/30/2022"], "sunday": [false], "monday": [false], "tuesday": [true], "wednesday": [false], "thursday": [true], "friday": [false], "saturday": [false], "instructionalMethodDescription": "Classroom Face-to-Face only", "attributeCodes": ["CATH", "ELEC", "RCTS", "UCCT"], "attributeDesc": ["CATH - Catholic Studies elec", "Undergraduate credit", "RELI - Theology & Spirituality", "Core: Christian or Catholic"], "description": "\r\nThis course is designed to introduce students of Christian and non-Christian backgrounds to Ignatian Spirituality. The major part of the course will study the dynamics of the Spiritual Exercises of Saint Ignatius by exploring the Ignatian themes of spiritual discernment, contemplation in action, and finding God in all things.\nOffered every semester. \r\n", "restrictions": "Main (M)Campus \nMust be enrolled in one of the following Campuses: \nMain (M)\n\n\n", "coreqs": "No corequisites", "prereqs": "\nCatalog Prerequisites\n\n  No prerequisite information available.\n\n\n\n\n\n\n\n", "fees": "\r\n\r\n    No fee information available.\r\n\r\n\r\n", "bookstoreLink": "https://www.bkstr.com/webApp/discoverView?bookstore_id-1=1296&term_id-1=202310&dept-1=RELI&course-1=339&section-1=01"}    const popUp = document.getElementById("pop_up_window")
    // const overlay = document.getElementById("overlay")
    // // console.log(sectionID.courseTitle)
    // document.getElementById("popUp-title").innerHTML = section.courseTitle + "<span style='font-weight:normal'> | </span>" + section.subject + section.courseNumber + "<span style='font-weight:normal'> | </span>" + section.creditHourSession + " credit hours"
    // document.getElementById("popUp-Description").innerHTML = section.description
    // document.getElementById("popUp-Professor").innerHTML = section.professorName + " | " + section.professorEmail
    // var meetingTimes = parse_time(section.beginTime) + "-" + parse_time(section.endTime)
    // document.getElementById("popUp-Meeting-Times").innerHTML = meetingTimes
    // var meetingDays = requirement.getWeekString(section)
    // document.getElementById("popUp-Meeting-Days").innerHTML = meetingDays
    // document.getElementById("popUp-Location").innerHTML = section.campusDescription + " Campus | " + section.buildingDescription
    // document.getElementById("popUp-Enrolment").innerHTML = section.enrollment + "/" + section.maximumEnrollment + " | Seats Available: " + section.seatsAvailable
    // document.getElementById("popUp-Hours").innerHTML = section.hoursWeek
    // document.getElementById("popUp-Attributes").innerHTML = getAttributes(section.attributeDesc)
    // document.getElementById("popUp-Prereqs").innerHTML = getPrereqs(section.prereqs)
    // document.getElementById("popUp-Coreqs").innerHTML = getPrereqs(section.coreqs)
    // document.getElementById("popUp-Restrictions").innerHTML = getPrereqs(section.restrictions)
    // document.getElementById("popUp-Fees").innerHTML = section.fees
    // document.getElementById("popUp-Bookstore").href = section.bookstoreLink

    
    const popUp = document.getElementById("pop_up_window")
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