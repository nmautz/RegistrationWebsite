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

  })

  $( "#slider-range" ).css("width", "25vw")
  $( "#slider-range" ).css("margin-left", "auto")
  $( "#slider-range" ).css("margin-right", "auto")



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