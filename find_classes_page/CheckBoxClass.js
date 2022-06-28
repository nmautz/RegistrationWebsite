class dayForm{
    constructor(text,dayNum,container)
    {
        this.text = text
        this.dayNum = dayNum
        this.container = container
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
            console.log(this.dayNum)
        })
    }
}
