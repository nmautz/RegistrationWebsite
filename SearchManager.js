fetch("/classes.json").then(response => response.json()).then( function(jsonData){
    
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





}


function search_class()
{
  

  return SearchManager.getInstance().getClasses(50)
    
}

