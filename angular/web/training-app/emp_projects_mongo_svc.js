const express = require('express')
var cors = require('cors')
const app = express()
const port = 7777
var mongoDBURL = "mongodb://localhost:10099/training"

// body parser config
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// adds the required Cors headers in the response 
app.use(cors())

app.get('/list',(req,res)=>{
   
            var db = client.db("training")

            db.collection("projects").find().toArray(function(err,result){
                if (err mongoClient.connect(mongoDBURL,function(err,client){
            if(err) throw err
) throw err

                console.log(result.length+' Projects Fetched')
                res.send(result)
            })
    })
})

app.post('/register',(req,res)=>{
  // read all the form parameter values send by the UI client
    var p_empno = req.body.empno
    var p_projectid = req.body.projectid  
    var p_name = req.body.name
    var p_location = req.body.location

    var new_project = {empno:p_empno,name:p_name,
                projectid:p_projectid,location:p_location}

    mongoClient.connect(mongoDBURL,function(err,client){
        if(err) throw err

        var db = client.db("training")

        db.collection("projects").insertOne(new_project, function(err,result){
            if(err) throw err

            console.log(result)
            res.send(new_project)
        })
    })
})
//<app-name>.<http-method>(<URL>,(req,res)=>{logic})
app.get('/', (req, res) => {
  res.send('Welcome MongoDB Employee Application Service')
})

app.listen(port, () => {
  console.log(`Employee Project App listening at http://localhost:${port}`)
})

