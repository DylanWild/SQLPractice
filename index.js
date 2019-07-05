const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const SQL = require('./libs/SQL')
const bcrypt = require('bcrypt');
const {promisify}= require('util')
const app = express();

const bcryptHash = promisify(bcrypt.hash)



// async function hash(pass){
//    return  await bcryptHash(pass, 13);

  
// }

app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//when browser sends get request
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/insert', async (req, res) => {
    let username = req.body.username;
    let name = req.body.name;
    let age = req.body.age;
    let password = req.body.password;

    let hashword = await bcryptHash(password, 13)
 
    sql.insert(username, name, age, hashword);

    res.render('index');

    // let username =req.body.username;
    // let name = req.body.name;
    // let age = req.body.age;

    // sql.insert(username, name, age)

    // res.render('index')

})



app.post('/', async (req, res) => {        
    let username = req.body.username;    
    let result = await sql.fetch(username);    
    res.render('index', 
    {   username: result.username,
        name: result.name,
        age: result.age, 
        password: result.password
    });
})

/* Insert code here*/
let connectOptions = [
    'localhost',
    'root',
    'password',
    'test_schema'
]

let sql = new SQL(...connectOptions)


app.listen(1337, () => {
    console.log("listening on port 1337")
})