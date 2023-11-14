const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')

class PeopleService {
    getPeople() {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) {
                    rej(error)
                } else {
                    const obj = JSON.parse(data)
                    res(obj)
                }
            })
        })
    }
    createPeople(newPeople) {
        return new Promise((res, rej) => {
            let data = fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) {
                    rej(error)
                } else {
                    const obj = JSON.parse(data)
                    obj.push(newPeople)
                    console.log(obj)
                    fs.writeFile('data.json', JSON.stringify(obj, null, 3), (err, data) => {
                        if (err) {
                            rej(err)
                        } else {
                            res(obj)
                        }
                    })
                }
            })
        })
    }
    editPeople(id, peopleData){
return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err,data) => {
        if(err){
            reject(err)
        } else {
            const obj = JSON.parse(data)
            const index = obj.findIndex(item => item.id === id)
            if(index === -1){
                reject ('Не существует')
            } else {
                
                const updatePeople = {...obj[index], ...peopleData}
                console.log('updatePeople', updatePeople)
                obj[index] = updatePeople
                fs.writeFile('data.json', JSON.stringify(obj,null,3), 'utf8', err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(obj)
                    }
                    })
            }
        }
    })
})
    }

    deletePeople(id){
        return new Promise((resolve, rejects) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if(error){
                    rejects(error)
                } else {
                    const obj = JSON.parse(data)
                    const index = obj.findIndex(item => item.id === id)
                    obj.splice(index, 1)
                    fs.writeFile('data.json', JSON.stringify(obj, null, 3), 'utf8', error => {
                        if(error){
                            rejects(error)
                        } else {
                            resolve(obj)
                        }
                    })
                }
            })
        })
    }
}
module.exports = new PeopleService();