(function ($) {
  var defaultSettings = {
    // Data attributes
    headers: [],  // String[] - Array of column headers
    tasks: [],    // Task[] - Array of tasks. Required fields: 
    // id: number, startTime: number, duration: number, column: number

    // Card template - Inner content of task card. 
    // You're able to use ${key} inside template, where key is any property from task.
    cardTemplate: '<div>${id}</div>',

    // OnClick event handler
    onClick: function (e, task) { },

    // Css classes
    containerCssClass: 'skeduler-container',
    headerContainerCssClass: 'skeduler-headers',
    schedulerContainerCssClass: 'skeduler-main',
    taskPlaceholderCssClass: 'skeduler-task-placeholder',
    cellCssClass: 'skeduler-cell',

    lineHeight: 30,      // height of one half-hour line in grid
    borderWidth: 1,      // width of board of grid cell

    debug: false
  };
  var settings = {};

  /**
   * Convert double value of hours to zero-preposited string with 30 or 00 value of minutes
   */
  function toTimeString(value) {
    return (value < 10 ? '0' : '') + Math.floor(value) + (Math.ceil(value) > Math.floor(value) ? ':30' : ':00');
  }

  /**
   * Return height of task card based on duration of the task
   * duration - in hours
   */
  function getCardHeight(duration) {
    return (settings.lineHeight + settings.borderWidth) * (duration * 2) - 1;
  }

  /**
   * Return top offset of task card based on start time of the task
   * startTime - in hours
   */
  function getCardTopPosition(startTime) {
    return (settings.lineHeight + settings.borderWidth) * (startTime * 2);
  }

  /**
  * Render card template
  */
  function renderInnerCardContent(task) {
    // var result = settings.cardTemplate;
    var result = "<div class='toBold'>${title}</div><div class='hiddenText'>${professor}</div><div class='hiddenText'>${timeString}</div><div class='clickForMore'>(Click for More)</div>"
    for (var key in task) {
      //// modified code to add card content regardless of if its a property
      // if (task.hasOwnProperty(key)) {
      //   // TODO: replace all
      //   result = result.replace('${' + key + '}', task[key]);
      // }
      result = result.replace('${' + key + '}', task[key]);
    }

    return $(result);
  }

  /**
   * Generate task cards
   */
  function appendTasks(placeholder, tasks) {
    var findCoefficients = function () {
      var coefficients = [];
      for (var i = 0; i < tasks.length - 1; i++) {
        var k = 0;
        var j = i + 1;
        while (j < tasks.length && tasks[i].startTime < tasks[j].startTime
          && tasks[i].startTime + tasks[i].duration > tasks[j].startTime) {
          k++;
          j++;
        }

        coefficients.push(k);
      }

      coefficients.push(0);
      return coefficients;
    };

    var normalize = function (args) {
      var indexes = {};
      for (var i = 0; i < args.length; i++) {
        var start = i;
        var count = 0;
        while (args[i] != 0) {
          i++;
          count++;
        }
        var end = i;
        if (count) {
          count++;
        }

        var index = 0;
        for (var j = start; j <= end; j++) {
          args[j] = count;
          indexes[j] = index++;
        }
      }

      return {args: args, indexes: indexes};
    };

    var args =
      normalize(
        findCoefficients()
      );

    // console.log("For loop modified to include tasks.length == 7")
    //see console log
    // for (var i = 0; i < args.args.length, tasks.length == 7; i++) {
    //   var width = 194 / (args.args[i] || 1);
     
    //   tasks[i].width = width;
    //   tasks[i].left = (args.indexes[i] * width) || 4;
    // }



    tasks.forEach(function (task, index) {

    

      var innerContent = renderInnerCardContent(task);
      var top = getCardTopPosition(task.startTime) - 371 ;
      var height = getCardHeight(task.duration);
      // var height = getCardHeight(task.duration);
      // console.log(getCardHeight(task.duration))
      var width = task.width || 194;
      var left = task.left || 0;
      if (task.backgroundColor == "red")
        var opacity = ".9"
      else 
        var opacity = "0.95"
      var card = $("<div></div>")
        .attr({
          //height modified from - 4 to + 5
          style: 'top: ' + top + 'px; height: ' + (height + 0.1) + 'px; ' + 'width: ' + (width + 2) + 'px; left: ' + left + 'px;' + "opacity:" + opacity,
          title: parse_time(task.startTimeUnMod) + ' - ' + parse_time(task.endTimeUnMod),
        });
      card.on('click', function (e) { settings.onClick && settings.onClick(e, task) });
      card.append(innerContent)
        .appendTo(placeholder);
      card.css('background-color', task.backgroundColor)
      // schedule.colorInd++
    }, this);
  }

  /**
  * Generate scheduler grid with task cards
  * options:
  * - headers: string[] - array of headers
  * - tasks: Task[] - array of tasks
  * - containerCssClass: string - css class of main container
  * - headerContainerCssClass: string - css class of header container
  * - schedulerContainerCssClass: string - css class of scheduler
  * - lineHeight - height of one half-hour cell in grid
  * - borderWidth - width of border of cell in grid
  */
  $.fn.skeduler = function (options) {



    $( "#plan_container" ).resizable({
      handles:'n',

      minHeight: 80,
      minWidth: 150
    });

    $("#plan_container").on("resize", function(){

      var outerH = $("#plan_container").height()
      $("#plan-scroll-container").height(Math.pow(outerH, 1.05))

    })
  


    settings = $.extend(defaultSettings, options);

    if (settings.debug) {
      console.time('skeduler');
    }

    var skedulerEl = $(this);

    $("#header-container").remove()
    skedulerEl.empty();
    skedulerEl.addClass(settings.containerCssClass);

    var div = $('<div></div>');

    // Add headers
    var headerContainer = div.clone().addClass(settings.headerContainerCssClass);
    settings.headers.forEach(function (element) {
      div.clone().text(element).appendTo(headerContainer);
    }, this);

    headerContainer.attr("id", "header-container")
    headerContainer.insertBefore($("#skeduler-container"))


    // Add schedule
    var scheduleEl = div.clone().addClass(settings.schedulerContainerCssClass);
    var scheduleTimelineEl = div.clone().addClass(settings.schedulerContainerCssClass + '-timeline');
    var scheduleBodyEl = div.clone().addClass(settings.schedulerContainerCssClass + '-body');

    var gridColumnElement = div.clone();

    //6 am to 10 pm
    for (var i = 6; i < 22; i++) {
      // Populate timeline
      div.clone()
        .text(toTwelveHourTime(i))
        // .text(toTimeString(i))
        .appendTo(scheduleTimelineEl);
      div.clone().appendTo(scheduleTimelineEl);

      gridColumnElement.append(div.clone().addClass(settings.cellCssClass));
      gridColumnElement.append(div.clone().addClass(settings.cellCssClass));
    }

    // Populate grid
    for (var j = 0; j < settings.headers.length; j++) {
      var el = gridColumnElement.clone();

      var placeholder = div.clone().addClass(settings.taskPlaceholderCssClass);
      appendTasks(placeholder, settings.tasks.filter(function (t) { return t.column == j }));

      el.prepend(placeholder);
      el.appendTo(scheduleBodyEl);
    }

    scheduleEl.append(scheduleTimelineEl);
    scheduleEl.append(scheduleBodyEl);

    skedulerEl.append(scheduleEl);

    if (settings.debug) {
      console.timeEnd('skeduler');
    }

    return skedulerEl;
  };
}(jQuery));