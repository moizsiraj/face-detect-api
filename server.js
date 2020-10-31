const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex')

const register = require('./controller/register')
const signin = require('./controller/signin')
const image = require('./controller/image')
const id = require('./controller/id')

app.use(bodyParser.json());
app.use(cors());

process.env.NODE_TLS_UNAUTHORIZED = 0

const db = knex ({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });

app.get('/', (req, res)=>{
    res.send('working')
})

app.post('/signin', (req, res) => {signin.handleSignin(res, req, db, bcrypt)})

app.post('/register',(req, res) => {register.handleRegister(res, req, db, bcrypt)})

app.put("/image", (req, res) => {image.handleImage(res, req, db)})

app.post("/imageURL", (req, res) => {image.handleApi(res, req)})

app.get('/profile/:id', (req, res)=>{id.handleId(res, req, db)})

app.listen(process.env.PORT, ()=>{
    console.log(`running on port ${process.env.PORT}`)
})

//the fucntion that made us cry
// function findUser(id){
//     let found = false;
//     let thisuser;
//     database.users.forEach(user => {
//         if(user.id === id){
//             found = true;
//             console.log(user)
//             thisuser = user;
//         }
//     })
//     if(!found){
//         return null;
//     }else{
//         return thisuser;
//     }
// }