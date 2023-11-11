const users = [ {
    id: 1,
    name: 'Dima',
    age: 29,
    isMan: true
},
{
    id: 2,
    name: 'Pavel',
    age: 27,
    isMan: true
},
{
    id: 3,
    name: 'Alisa',
    age: 3,
    isMan: false
},
{
    id: 4,
    name: 'Alesia',
    age: 27,
    isMan: false
}]

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const PORT = 3000;

app.get('/users', (req, res) => {
    res.send(users)

})
app.post('/users', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(404)
        return
    }
    const newUser = {
        id: 5,
        name: req.body.name,
        age: req.body.age
    }
    users.push(newUser)
    res.status(201).send(newUser)
})
app.put('/users/:id', (req, res) => {
    const updateUsers = users.map((i) => (i.id === +req.params.id ? req.body : i))
    users.splice(0, users.length, ...updateUsers)
    res.send(users)
})
app.patch('/users/:id', (req, res) => {
    const updateUsers = users.map((i) => (i.id === +req.params.id ? {...i, age: req.body.age} : i))
    users.splice(0, users.length, ...updateUsers)
    res.send(users)
})
app.delete('/users/:id', (req, res) => {
    for (let i = 0; i <= users.length; i++) {
        if (users[i].id === +req.params.id) {
            users.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404)
})
app.get('/users/filtredUsers', (req, res) => {
    const {min, max} = req.query;
   const found = users.filter(item => item.age >= parseInt(min) && item.age <= parseInt(max) )
   res.send(found)
 })
app.get('/users/:gender', (req, res) => {
    if (req.params.gender === 'M') {
       const male =  users.filter(item => item.isMan)
       res.send(male)}
         if(req.params.gender === 'F') {
            female = users.filter(item => !item.isMan)
            res.send(female)  
    }   
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});




