fetch("/classes.json").then(response => response.json()).then( function(jsonData){
    
  classesList = jsonData["data"]
  SearchManager.getInstance().getClasses()




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
    this.requirements = [];
    this.isModified = false; //Tracks if search params have changed to save from unneeded search 
  }

  updateRequirement(id_str, arg){
    this.requirements[id_str].arg = arg;
    this.isModified = true;
  }

  _addRequirement(id_str, func, arg){ // func should take (arg, class) as parameter
    this.requirements[id_str] = {
      func: func,
      arg: arg
    };
    this.isModified = true;

  }


  getClasses(){
    var classes = []
    var reqKeys = this.requirements.keys;
    for(var i = 0; i < classesList.length; ++i){
      var valid = true;
      for(var c = 0; c < reqKeys.length; ++c){

        var req = this.requirements[reqKeys]
    
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





}
