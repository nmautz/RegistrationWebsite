function getVals(){
    // Get slider values
    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
      var slide1 = parseFloat( slides[0].value );
      var slide2 = parseFloat( slides[1].value );
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 )
    { 
        var tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }
    
    var displayElement = parent.getElementsByClassName("rangeValues")[0];
        displayElement.innerHTML = minToTime(slide1 * 20) + " - " + minToTime(slide2 * 20);
  }
  
  window.onload = function(){
    // Initialize Sliders
    var sliderSections = document.getElementsByClassName("range-slider");
        for( var x = 0; x < sliderSections.length; x++ ){
          var sliders = sliderSections[x].getElementsByTagName("input");
          for( var y = 0; y < sliders.length; y++ ){
            if( sliders[y].type ==="range" ){
              sliders[y].oninput = getVals;
              // Manually trigger event first time to display values
              sliders[y].oninput();
            }
          }
        }
  }

  
function minToTime(min)
{
    var remainderMin = min % 60
    var hours = (min - remainderMin) / 60
    hours = hours % 24
    if (hours >= 12 && hours != 24)
        var timePeriod = "PM"
    else
        var timePeriod = "AM"

    hours = hours % 12
    if (hours == 0)
        hours = 12
    if (remainderMin < 10)
        remainderMin = String("0" + remainderMin)
    return String(hours + ":" + remainderMin + " " + timePeriod)
}
// class timeSlider{
//     constructor(insertElement,requirementObj,output)
//     {
//         this.insertElement = insertElement
//         this.requirementObj = requirementObj
//         this.leftSliderId = "leftSlider"
//         this.rightSliderId = "RightSlider"
//         this.output = output
//         this.createSliders(this.leftSliderId,25)
//         this.createSliders(this.rightSliderId,75)
        
//     }

//     createSliders(id,startValue)
//     {
//         const sliderInsert = document.getElementById(this.insertElement)
//         const rangeElement = document.createElement("input")
//         rangeElement.type = "range"
//         rangeElement.id = id
//         rangeElement.min = 0
//         rangeElement.max = 1440
//         rangeElement.value = startValue
//         rangeElement.addEventListener("input", (e) =>
//         {
//             e.currentTarget.id
//             if(e.currentTarget.id == this.leftSliderId)
//             {
//                 var otherSlider = document.getElementById(this.rightSliderId)
//                 // if(e.currentTarget.value >= otherSlider.value)
//                 // {
//                 //     // otherSlider.value = e.currentTarget.value
//                 //     e.currentTarget.value = otherSlider.value
//                 //     // e.currentTarget.value = otherSlider.value
//                 // }        
//                 console.log(e.currentTarget.value,otherSlider.value)
                
//             }else
//             {
//                 // var otherSlider = document.getElementById(this.leftSliderId)
//                 // if(e.currentTarget.value <= otherSlider.value) 
//                 // {
//                 //     // otherSlider.value = e.currentTarget.value
//                 //     e.currentTarget.value = otherSlider.value
//                 //     // e.currentTarget.value = otherSlider.value
//                 // }
//                 document.getElementById(this.output).textContent = minToTime(e.currentTarget.value)
                
//             }
//             // console.log(e.currentTarget.value)
//         })
//         sliderInsert.appendChild(rangeElement)
//     }
// }

