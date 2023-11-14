const PeopleService = require('../services/people.services')

class peopleControllers{
async getPeople(){
    let people = await PeopleService.getPeople()
    return people
}
async createPeople(people){
    let newPeople = await PeopleService.createPeople(people);
    return newPeople
}
async editPeople(id, peopleData){
    let updatePeople = await PeopleService.editPeople(id, peopleData);
    return updatePeople
}
async deletePeople(id){
    const updatePeople = await PeopleService.deletePeople(id);
    return updatePeople
}

}

module.exports = new peopleControllers()

