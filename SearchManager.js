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

  }






}
