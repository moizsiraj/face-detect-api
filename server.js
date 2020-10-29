const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '1',
            name: "aaa",
            email: "m@c",
            password: "x",
            entries: 0,
            joined: new Date(),
        },
        {
            id: "2",
            name: "bbb",
            email: "n",
            password: "y",
            entries: 0,
            joined: new Date(),
        }
    ]
}

app.get('/', (req, res)=>{
    res.send(database.users)
})

app.post('/signin', (req, res)=>{
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0])
    }else{
        res.status(400).json("error logging in")
    }
})

app.post('/register', (req, res)=>{
    const {name, email, password} = req.body
    database.users.push({
            id: '123',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date(),
    })
    res.json(database.users[database.users.length-1]);
})

app.put("/image", (req, res)=>{
    const {id} = req.body
    const user = findUser(id)
    if(user === null){
        res.status(400).json("no such user")
    }else{
        user.entries++;
        return res.json(user.entries);
    }
})

function findUser(id){
    let found = false;
    let thisuser;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            console.log(user)
            thisuser = user;
        }
    })
    if(!found){
        return null;
    }else{
        return thisuser;
    }
}


app.get('/profile/:id', (req, res)=>{
    const {id} = req.params;
    var user = new findUser(id);
    console.log(user)
    if(user === null){
        res.status(400).json("no such user")
    }else{
        return res.json(user);
    }
})

app.listen(3001, ()=>{
    console.log('running on port 3001')
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });