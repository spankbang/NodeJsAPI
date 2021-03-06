var http = require("http")
var app = require("./app")


var server = http.createServer(app)
console.log("server started on 3000")
server.listen(3000)




