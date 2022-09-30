fetch("/classes.json").then(response => response.json()).then( function(jsonData){
    
    classesList = jsonData["data"]



})


function search_class_by_query(query)
{
    if (!query.isEmpty())
    {
       {
        var limit = 50
        var classCount = 0
        var section_data = []
        for(var i = 0; i < classesList.length && classCount < limit ; ++i)
        {
            if(requirement.meetsRequirements(classesList[i]))
            {
                section_data.push(classesList[i])
                classCount++
            }

        }
        return section_data
        } 
        
        
    }
}

function search_class()
{

  return search_class_by_query(requirement)
    
}

function add_sections_from_array(sections){

    if(sections != null){
        const classContainter = document.getElementById("classes-list-container")
        for(var i = 0; i < sections.length; ++i){
            addClassSection(sections[i], classContainter)
        }

    }

    

}

function update_section_display(){

    const classContainter = document.getElementById("classes-list-container")
    while(classContainter.firstChild){
        classContainter.removeChild(classContainter.firstChild)
    }

    



    add_sections_from_array(search_class())


}
  

  
document.addEventListener("DOMContentLoaded", function(){

    const subject_input = document.getElementById("subject-input")
    const courseNumber_input = document.getElementById("courseNumber-input")

})

