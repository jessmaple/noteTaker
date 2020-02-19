var express = require("express")
var Port = process.env.PORT || 8080
var app = express()

 app.use(express.urlencoded({extended:true}))
 app.use(express.json())


 app.use(express.static("public"))

 var routes = require("./routes/routes")
 routes(app)


 app.listen(Port,function(){
     console.log("app is listening on http://localhost:"+Port)
 })