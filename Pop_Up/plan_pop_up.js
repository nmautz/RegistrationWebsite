function open_plan_pop_up(title, text, btnName, btnOnClick)
{
    const overlay = document.getElementById("overlay")
    document.getElementById("plan_popUp_title").innerHTML = title;
    document.getElementById("input_plan_popUp").ariaPlaceholder = text;
    let btn = document.getElementById("btn_plan_popIp")
    btn.innerHTML = btnName
    btn.onclick = btnOnClick

    const popUp = document.getElementById("plan_popUp_window")
    if (popUp == null)
        return
    popUp.classList.add("active")
    overlay.classList.add("active")
}

function close_plan_popUp()
{
    const popUp = document.getElementById("plan_popUp_window")
    const overlay = document.getElementById("overlay")
    if (popUp == null)
        return
    popUp.classList.remove("active")
    overlay.classList.remove("active")
}
