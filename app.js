//jshint esversion: 6



//for express framwork
const express = require ("express");
//bodyParser to talking with forn
const bodyParser = require("body-parser");
// to make http requests
const request = require("request");

const app = express();

//to include style locally
app.use(express.static("public"));

//to retreive form data
app.use(bodyParser.urlencoded({extended: true}));


app.get("/" ,function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/" ,function(req,res){
  var firstName = req.body.fName ;
  var lastName = req.body.lName ;
  var email = req.body.email ;
  var data = {
    members : [
      {
        email_adress: email,
       status : "subscribed",
       merge_fields : {
         FNAME: firstName,
         LNAME: lastName ,
       },
     }
    ]
  };

 var jsonData =JSON.stringify(data);


  var options = {
    url :"https://us20.api.mailchimp.com/3.0/lists/fd20fb8287",
    method : "POST",
    headers : {
      "Authorization" : "basel 14ae5610d217d27d32e40bdf69179cae-us20"
    },
    body : jsonData,
  };


  request(options , function (error ,  response , body){
    if (error){
      res.sendFile(__dirname + "/failure.html");
    } else {
      res.sendFile(__dirname + "/failure.html");    }
  });

//  console.log(firstName,lastName,email);

});

app.post("/failure", function(req,res){
res.redirect("/");
}),


app.listen(process.env.PORT || 3000 , function(){
  console.log("server is running in port 3000");

});


//14ae5610d217d27d32e40bdf69179cae-us20

//list // fd20fb8287
