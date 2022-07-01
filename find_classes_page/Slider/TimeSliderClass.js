class timeSlider{
    constructor(insertElement,requirementObj)
    {
        this.insertElement = insertElement
        this.requirementObj = requirementObj
        this.leftSliderId = "leftSlider"
        this.rightSliderId = "RightSlider"
        this.createSliders(this.leftSliderId,25,0,100)
        this.createSliders(this.rightSliderId,75,0,100) 
        
    }

    createSliders(id,startValue,min,max)
    {
        const sliderInsert = document.getElementById(this.insertElement)
        const rangeElement = document.createElement("input")
        rangeElement.type = "range"
        rangeElement.id = id
        rangeElement.min = min
        rangeElement.max = max
        rangeElement.value = startValue
        rangeElement.addEventListener("input", (e) =>
        {
            e.currentTarget.id
            if(e.currentTarget.id == this.leftSliderId)
            {
                var otherSlider = document.getElementById(this.rightSliderId)
                if(e.currentTarget.value >= otherSlider.value)
                {
                    // otherSlider.value = e.currentTarget.value
                    e.currentTarget.value = otherSlider.value
                    // e.currentTarget.value = otherSlider.value
                }        
                console.log(e.currentTarget.value,otherSlider.value)
                
            }else
            {
                var otherSlider = document.getElementById(this.leftSliderId)
                if(e.currentTarget.value <= otherSlider.value) 
                {
                    // otherSlider.value = e.currentTarget.value
                    e.currentTarget.value = otherSlider.value
                    // e.currentTarget.value = otherSlider.value
                }        
                console.log(e.currentTarget.value,otherSlider.value)
                    
            }
            // console.log(e.currentTarget.value)
        })
        sliderInsert.appendChild(rangeElement)
    }
}
