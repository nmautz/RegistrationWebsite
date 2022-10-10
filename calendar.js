
class Calendar{


  static _instance = null;

  static getInstance(){
    if(this._instance == null){
      this._instance = new this();
    }
    return this._instance;
  }

  getCurrentPlanID() {
    return getCurrentPlanIDDB();
  }
 
  setCurrentPlanID(planID) {
    setCurrentPlanIDDB(planID);
  }
 
  getDefaultPlan(){
    return this.#defaultPlan;
  }
  
  #defaultPlan = "Spring 2023"

  constructor(){

    this.tableDiv = document.getElementById("calendar-table");
    this.time_increment = 30 //minutes
    this.start_time = 420 // 420 min aka 7am
    this.end_time = 1280 // 9:00 pm

    


    this.create_table();



  }


  create_table(){

    let planID = this.getCurrentPlanID();

    var classes = load_classes(planID) //TODO unhardcode

    this.refs = { //Resets refs array
      Sunday: {},
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {}
    } 

    let earliest = null;


    if(classes.length != 0){
      earliest = classes[0];
      for(var id in classes){
        if(id!=0){
          if(classes[id].beginTime[0] < earliest.beginTime){
            earliest = classes[id];
          }
        }
        
      }
    }else{
      earliest= {beginTime: [800]}; //default beginTime
    }


    try{



      this.start_time = parseTime(earliest) -60;



    }catch(e){
    }

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

    let topAmount = (round_stime - start_time)/this.time_increment;

    var span = ((round_etime - this.start_time) - (round_stime - this.start_time))/this.time_increment

    var activeDays = [class_section.sunday[0],class_section.monday[0],class_section.tuesday[0],class_section.wednesday[0],class_section.thursday[0],class_section.friday[0],class_section.saturday[0]]
    var dayNames = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"]

    var addedBlocks = []
    //adding blocks to calendar
    for (var i = 0; i < activeDays.length; ++i)
    {
      if (activeDays[i])
      {

        this.refs[dayNames[i]][round_stime].style.top = toString( 100/topAmount);

        this.refs[dayNames[i]][round_stime].innerHTML = class_section.courseTitle;

        this.refs[dayNames[i]][round_stime].rowSpan = span;

        this.refs[dayNames[i]][round_stime].classList.add("calendar-item")

        this.refs[dayNames[i]][round_stime].style.backgroundColor = class_section.color

        this.refs[dayNames[i]][round_stime].addEventListener("click", function()
        {
          open_pop_up(class_section)
        })

        //set display of td that would be in the way
        var timeI = parseInt(round_stime)
        var spanI = span;
        while(spanI-1 > 0){
          timeI+=this.time_increment
          this.refs[dayNames[i]][timeI].style.display = "none"
          spanI--;

        }
        addedBlocks.push(this.refs[dayNames[i]][round_stime])
      }
    }
    
    //if one class is hovered over, then all the rest act as if they were hovered over
    //adds close btn
    for (var i = 0; i < addedBlocks.length; ++i)
    {
      addedBlocks[i].addEventListener("mouseover",function(){
        for (var j = 0; j < addedBlocks.length; ++j)
          addedBlocks[j].classList.add("hover")
      })

      addedBlocks[i].addEventListener("mouseout",function(){
        for (var j = 0; j < addedBlocks.length; ++j)
          addedBlocks[j].classList.remove("hover")
      })

      //adding close btn
      const closebtn = document.createElement("div");
      closebtn.classList.add("close-button-cal")
      closebtn.innerHTML = 'X';
      addedBlocks[i].appendChild(closebtn);
      closebtn.addEventListener("click", (e)=>{
        //Unsave class
        let planID = Calendar.getInstance().getCurrentPlanID();
        let id = class_section.id;

        remove_class_by_ID(planID, id);

        Calendar.getInstance().update_calendar();
        update_section_display();


        e.stopPropagation();


      })


    }

    
  }




  update_calendar(){



    let rowIDs = Object.keys(this.tableDiv.childNodes);


    for(let i = rowIDs.length; i > 2; --i){

      let rowID = rowIDs[i];


      let row = this.tableDiv.childNodes[rowID];
      try{
        this.tableDiv.removeChild(row);


      }catch(e){}
  
  

    }

    this.create_table();


    var class_sections = load_classes(Calendar.getInstance().getCurrentPlanID()) //TODO Unhardcode plan_id

    for(var id in class_sections){

      this.addClassSectionToDisplay(class_sections[id]);


    }
    

  }


  round_time_to_interval(time){

    let keys = Object.keys(this.refs.Saturday);

    var closest = keys.reduce(function(prev, curr) {
      return (Math.abs(curr - time) < Math.abs(prev - time) ? curr : prev);
    });

    console.log(closest + "\n" + keys)

    return closest


    
  }

}


function parseTime(earliest) {
  let hour = earliest.beginTime[0].substring(0, 2);
  let min = earliest.beginTime[0].substring(2);

  return ((hour * 60) + parseInt(min));
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