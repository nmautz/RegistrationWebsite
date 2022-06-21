class Load_Queue {

  static source_list = {}
  static result_list = {}

  static addToQueue(source, func){


    //Checks if result has been received
    if(this.result_list[source] != null){
      func(this.result_list[source])
    }else{
      //Checks if queue has already been created
      if(!(source in this.source_list)){
        //Creates empty array for functions to be stored in
        this.source_list[source] = []

        //Create callback
        fetch(source).then(response => response.json()).then( (jsonData) => {
          this.executeQueue(source, jsonData)
        })  
        


      }
      //Add function to source queue
      this.#queueFunctionKV(source, func)
    }



  }


  static executeQueue(source, jsonData){

    var func_list = this.source_list[source]

    for(var i = 0; i < func_list.length; ++i){
      func_list[i](jsonData)
    }
    
    this.result_list[source] = jsonData

  }


  static #queueFunctionKV(source, func){

    this.source_list[source].push(func)

  }



}