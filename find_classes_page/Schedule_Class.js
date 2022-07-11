//global variable created bellow class creation
class Schedule {
    constructor(insertPoint)
    {
        this.insertPoint = insertPoint
    }
    createBlankSchedule()
    {

    }

    loadSchedule(planID)
    {
        var classes = load_classes(planID)
        console.log("*********")
        for (var i = 0; i < classes.length; ++i)
        {
            console.log(classes[i])
        }
        console.log("*********")
    }
}

const schedule = new Schedule()
