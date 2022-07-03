$( function() {


  const TIME_INTERVAL = 48

  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: TIME_INTERVAL,
    values: [ 500, 1000 ],
  });

  $( "#slider-range" ).css("width", "25vw")
  $( "#slider-range" ).css("margin-left", "auto")
  $( "#slider-range" ).css("margin-right", "auto")


  $("#slider-range").on("slide", function(event, ui) {
    var lower_knob_val = $('#slider-range').slider("values")[0];
    var upper_knob_val = $('#slider-range').slider("values")[1];

    var lower_knob_time = document.getElementById("lower_knob");
    var upper_knob_time = document.getElementById("upper_knob");

    lower_knob_time.textContent = minToTime(lower_knob_val, TIME_INTERVAL)
    upper_knob_time.textContent = minToTime(upper_knob_val, TIME_INTERVAL)

    console.log($( "#slider-range:first" ).offset())

    lower_knob_time.style.left = String((lower_knob_val+2)/(TIME_INTERVAL/100)
     - 5) + "vw";

    upper_knob_time.style.left = String((upper_knob_val+2)/(TIME_INTERVAL/100) - 5) + "vw";



});


})


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