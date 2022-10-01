
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

    time_td.innerHTML = time;
    time_td.classList.add = "calendar-time";



  }


}


