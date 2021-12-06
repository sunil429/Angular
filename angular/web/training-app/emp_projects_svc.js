const express = require('express')
var mysql = require('mysql')
var cors = require('cors')

const app = express()
const port = 7799

// apply common service configuration for each request

// body parser config
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// adds the required Cors headers in the response 
app.use(cors())


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'training',
    port: 3316 // default port for mysql 3306
  })

connection.connect()

app.get('/list',(req,res)=>{
    var qry_Select="SELECT * FROM ang_emp_projects"

    connection.query(qry_Select, function (err, rows, fields) {
        if (err) throw err
      
        res.send(rows)
        console.log(rows.length +" Projects Fetched from the DB")
      })
})

app.post('/register',(req,res)=>{
  // read all the form parameter values send by the UI client
    var empno = req.body.empno
    var projectid = req.body.projectid  
    var name = req.body.name
    var location = req.body.location

    var qry_Insert = 
    "insert into ang_emp_projects (empno,projectid,name,location) values(?,?,?,?)"

    connection.query(qry_Insert,[empno,projectid,name,location],
      function(err,rows,fields){
        if (err) throw err

        console.log(projectid+" Registered in DB for empno "+empno)
        res.send({"empno":empno,"name":name,
          "location":location,"projectid":projectid})
      })
})


//<app-name>.<http-method>(<URL>,(req,res)=>{logic})
app.get('/', (req, res) => {
  res.send('Welcome Employee Application Service')
})

app.listen(port, () => {
  console.log(`Employee Project App listening at http://localhost:${port}`)
})
