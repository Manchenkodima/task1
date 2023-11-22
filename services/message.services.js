const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')

class MessageService {
    getMessage() {
        return new Promise((res, rej) => {
            fs.readFile('message.json', 'utf8', (error, message) => {
                if (error) {
                    rej(error)
                } else {
                    const obj = JSON.parse(message)
                    res(obj)
                }
            })
        })
    }
    createMessage(newMessage) {
        return new Promise((res, rej) => {
            let message = fs.readFile('message.json', 'utf8', (error, message) => {
                if (error) {
                    rej(error)
                } else {
                    const obj = JSON.parse(message)
                    obj.push(newMessage)
                    fs.writeFile('message.json', JSON.stringify(obj, null, 3), (err, message) => {
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
    editMessage(id, messageData) {
        return new Promise((res, rej) => {
            fs.readFile('message.json', 'utf8', (err, message) => {
                if (err) {
                    rej(err)
                } else {
                    const obj = JSON.parse(message)
                    const index = obj.findIndex(item => item.id === id)
                    if (index === -1) {
                        rej('Не существует')
                    } else {
                        const updateMessage = { ...obj[index], ...messageData }
                        obj[index] = updateMessage
                        fs.writeFile('message.json', JSON.stringify(obj, null, 3), 'utf8', err => {
                            if (err) {
                                rej(err)
                            } else {
                                res(obj)
                            }
                        })
                    }
                }
            })
        })
    }


    deleteMessage(min, max) {
        return new Promise((resolve, rejects) => {
            fs.readFile('message.json', 'utf8', (error, message) => {
                if (error) {
                    rejects(error)
                } else {
                    const obj = JSON.parse(message)
                    const filterMessage = obj.filter(item => item.id > min && item.id < max)
                    if (filterMessage.length === 0) {
                        rejects('Массив пуст')
                    } else {
                        resolve(filterMessage)
                    }
                }
            })
        })
    }
}
module.exports = new MessageService()
// getFilteredPeople(min, max) {
//     return new Promise((res, rej) => {
//         fs.readFile('data.json', 'utf8', (error, data) => {
//             if (error) {
//                 reject(error)
//             } else {
//                 const obj = JSON.parse(data)
//                 const filteredPeople = obj.filter(item => item.age > min && item.age < max)
//                 if (filteredPeople.length === 0) {
//                     rej('Массив пуст')
//                 } else {
//                     res(filteredPeople)
//                 }
//             }
//         })
//     })
// }