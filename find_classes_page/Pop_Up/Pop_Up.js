function open_pop_up(section)
{
    const popUp = document.getElementById("pop_up_window")
    const overlay = document.getElementById("overlay")
    // console.log(sectionID.courseTitle)
    document.getElementById("popUp-title").innerHTML = section.courseTitle
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