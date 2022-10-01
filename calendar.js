
class Calendar{


  static _instance = null;

  static getInstance(){
    if(this._instance == null){
      this._instance = new this();
    }
    return this._instance;
  }

  constructor(){

    this.tableDiv = document.getElementById("calendar-table");
    this.time_increment = 30 //minutes
    this.start_time = 360 // 360 min aka 6am
    this.end_time = 1439 // 11:59 pm

    this.refs = {
      Sunday: {},
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {}
    } 


    this.create_table();



  }


  create_table(){

    var time = this.start_time;

    while (time < this.end_time){

      this.create_row(time);

      time += this.time_increment;
    }


  }


  create_row(time){


    var row = document.createElement("tr");
    this.tableDiv.appendChild(row);
    var time_td = document.createElement("td");
    row.appendChild(time_td);

    time_td.innerHTML = min_to_str_time(time);
    time_td.classList.add = "calendar-time";


    for(var id in this.refs){
      var td = document.createElement("td");
      row.appendChild(td);


      this.refs[id][time] = td;     
  
    }

  }


  addClassSectionToDisplay(class_section){
    var start_time_str = class_section.beginTime[0]
    var end_time_str = class_section.endTime[0]

    var start_time = (parseInt(start_time_str[0] + start_time_str[1])*60) + parseInt(start_time_str[2] + start_time_str[3])
    var end_time = (parseInt(end_time_str[0] + end_time_str[1])*60) + parseInt(end_time_str[2] + end_time_str[3])

    var round_stime = this.round_time_to_interval(start_time);
    var round_etime = this.round_time_to_interval(end_time);

    var span = ((round_etime - this.start_time) - (round_stime - this.start_time))/this.time_increment

    var activeDays = [class_section.sunday[0],class_section.monday[0],class_section.tuesday[0],class_section.wednesday[0],class_section.thursday[0],class_section.friday[0],class_section.saturday[0]]
    var dayNames = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"]

    for (var i = 0; i < activeDays.length; ++i)
    {
      if (activeDays[i])
      {
        this.refs[dayNames[i]][round_stime].innerHTML = class_section.courseTitle;

        this.refs[dayNames[i]][round_stime].rowSpan = span;

        this.refs[dayNames[i]][round_stime].classList.add("calendar-item")

        this.refs[dayNames[i]][round_stime].addEventListener("click", function()
        {
          open_pop_up(class_section)
        })
  
      }
    }
    console.log(min_to_str_time(round_etime))
  }



  update_calendar(){
    var class_sections = load_classes("1") //TODO Unhardcode plan_id

    for(var id in class_sections){

      this.addClassSectionToDisplay(class_sections[id]);


    }

  }


  round_time_to_interval(time){
    return Math.ceil(time/this.time_increment)*this.time_increment;
  }

}


function min_to_str_time(min){


  var hour = Math.floor(min/60);
  var ampm = "";

  if(hour > 12){
    hour = hour - 12;
    ampm = "PM"

  }else if(hour == 12){

    ampm = "PM"

    
  }else{

    ampm = "AM"


  }


  var hour_str = hour.toString();
  var min_str = (min % 60).toString();



  if(min_str.length == 1){
    min_str = "0"+min_str;
  }
  if(hour_str.length == 1){
    hour_str = "0"+hour_str;
  }





  return (hour_str +":" + min_str + " " + ampm)


}

