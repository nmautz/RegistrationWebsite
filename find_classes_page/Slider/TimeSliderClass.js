

$( function() {


  const TIME_INTERVAL = 48

    var handle = $("#lower_text")
    var handle2 = $("#upper_text")

  $( "#slider-range" ).slider({

    create: function() {
        handle.text( minToTime($( this ).slider( "values" )[0], TIME_INTERVAL) );
        handle2.text( minToTime($( this ).slider( "values" )[1], TIME_INTERVAL) );
    },
    range: true,
    min: 0,
    max: TIME_INTERVAL,
    values: [ 16, 36 ],
  });

  $("#slider-range").on("slide", function(event, ui) {
    handle.text( minToTime(ui.values[0], TIME_INTERVAL) );
    handle2.text( minToTime(ui.values[1], TIME_INTERVAL));
    checkTimeTextDistance();

  })
  $("#slider-range").on("slidechange", function(event, ui) {

    var lower_time =  minToTime(ui.values[0], TIME_INTERVAL) 
    var upper_time =  minToTime(ui.values[1], TIME_INTERVAL)
    requirement.addTimeRequirement(lower_time,upper_time)
    update_section_display()
  })




  $( "#slider-range" ).css("width", "25vw")
  $( "#slider-range" ).css("margin-left", "auto")
  $( "#slider-range" ).css("margin-right", "auto")



})

function clearSlider(use)
{
  const TIME_INTERVAL = 48
  var values= [ 16, 36 ]
  var handle = $("#lower_text")
  var handle2 = $("#upper_text")
  handle.text( minToTime(values[0], TIME_INTERVAL) );
  handle2.text( minToTime(values[1], TIME_INTERVAL) );
  $( "#slider-range" ).slider({

      create: function() {
          handle.text( minToTime($( this ).slider( "values" )[0], TIME_INTERVAL) );
          handle2.text( minToTime($( this ).slider( "values" )[1], TIME_INTERVAL) );
      },
      range: true,
      min: 0,
      max: TIME_INTERVAL,
      values: [ 16, 36 ],
  });
  requirement.addTimeRequirement('','')
  if (use == 1)
     update_section_display()
}

function minToTime(min, time_interval)
{

  min = parseInt(min)

  min =( min * 1440 )/time_interval
  min = String(min)


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

function time_to_min(time)
{
  var totalMin = 0
  var hours = parseInt(time)
  totalMin += hours * 60
  var timeLessHours = time.replace(hours,"")
  var minutes = parseInt(timeLessHours.replace(":",""))
  totalMin += minutes
  if (time.includes("PM") && hours != 12)
    totalMin += 60 * 12
  else if (time.includes("AM") && hours == 12)
    totalMin -= 12 * 60    
  
  return totalMin

}

//Converts time formated at "0930" to "9:30"
function dbTimeToNiceTime(dbTime){
  console.log(dbTime.substring(0,3))


}


function checkTimeTextDistance(){

  const lower_text = document.getElementById("lower_text");
  const upper_text = document.getElementById("upper_text");


  var lower_rect = lower_text.getBoundingClientRect();
  var upper_rect = upper_text.getBoundingClientRect();
  


  if(upper_rect.right - lower_rect.right < 60){

    upper_text.style.top = "2vh"
  }else{

    upper_text.style.top = "-5vh"
  }

}

document.addEventListener("DOMContentLoaded",function() {
  window.addEventListener('resize', function(){checkTimeTextDistance()})
});

