fetch("./classes.json").then(response => response.json()).then( function(jsonData){
    
  classesList = jsonData["data"]



})

class SearchManager{

  static _instance = null;

  static getInstance(){
    if(this._instance == null){
      this._instance = new this();
    }
    return this._instance;
  }

  constructor(){
    this.requirements = {};
    this.isModified = false; //Tracks if search params have changed to save from unneeded search 
  }

  updateRequirement(id_str, arg){
    this.requirements[id_str].arg = arg;
    this.isModified = true;
  }

  addRequirement(id_str, arg, func){ // func should take (arg, class_section) as parameter
    this.requirements[id_str] = {
      func: func,
      arg: arg
    };
    this.isModified = true;

  }


  getClasses(limit){


    var classes = []
    for(var i = 0; i < classesList.length && (limit == null || classes.length < limit); ++i){

      var valid = true;


      for(var key in this.requirements){

          

        var req = this.requirements[key]



        if(!req.func(req.arg, classesList[i])){
          valid = false;
        }


      }

      if(valid){
        classes.push(classesList[i]);
      }
    }

    return classes;
  }

  clearAllRestrictionsArg(){

    for(var id in this.requirements){
      this.requirements[id].arg = ""
    }
  }


  getClassesByReq(req_str){

    var classes = []

    for(var i = 0; i < classesList.length; ++i){

      var valid = true;

      var req = this.requirements[req_str]



      if(!req.func(req.arg, classesList[i])){
        valid = false;
      }

      if(valid){
        classes.push(classesList[i]);
      }
    }

    return classes;

  }

  //returns the string form of the sections meeting days
  getWeekString(section)
  {
    var week_days = [section.sunday, section.monday, section.tuesday, section.wednesday, section.thursday, section.friday, section.saturday]
    var meetDays = ""
    var key = []
    for (var i = 0; i < week_days.length; ++i)
    {
      if(week_days[i][0])
        key.push(i)
      else
        meetDays = this.clearStack(key,meetDays)
    }
    meetDays = this.clearStack(key,meetDays)
        
    return meetDays
  }

  clearStack(key,meetDays)
  {
    var weekDayTitles = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var sWeekDayTitles = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    if(key.length > 2)
        {
          //reversing stack
          var last = sWeekDayTitles[key.pop()]
          while(key.length > 1)
            key.pop()
          var first = sWeekDayTitles[key.pop()]
          if(meetDays != "")
            meetDays += ","
          meetDays = String(meetDays + " " + first + "-" + last)
        }else if(key.length > 0)
        {
          key.reverse()
          while(key.length > 0)
          {
            if(meetDays != "")
              meetDays += ","
            meetDays = String(meetDays + " " + weekDayTitles[key.pop()])
          }
            
        }
    return meetDays
  }


}


function search_class()
{
  

  return SearchManager.getInstance().getClasses(50)
    
}

