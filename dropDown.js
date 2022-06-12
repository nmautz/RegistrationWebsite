fetch("listOfMajors.txt").then(response => response.text()).then(function(listOfMajorsData){
    for (var i = 0; i < majorsData.length; ++i)
    {
        const dropdownUI = document.getElementById("dropDown")
        const aElement = document.createElement("a")
        const text = document.createTextNode(listOfMajorsData[i])
        aElement.appendChild(text)
        dropdownUI.insertAdjacentElement("beforeend",aElement)
    }
  })