
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
    this.time_increment = 60 //minutes
    this.start_time = 360 // 360 min aka 6am
    this.end_time = 1439 // 11:59 pm
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

