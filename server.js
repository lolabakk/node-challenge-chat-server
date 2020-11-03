const express = require("express");
const cors = require('cors')

const app = express();
const bodyParser = require("body-parser");
app.use(cors())
// app.use(express.json({ limit: "50mb", parameterLimit: 50000 }))
app.use(bodyParser.urlencoded({ extended: true }));



const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage]

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

//GET ALL MESSAGES
app.get("/messages", function(request, response){
  response.json(messages);
});
//create message
app.post("/messages", function (request, response){  
  let myMessage = request.body; 
  //LEVEL 2
 if(myMessage.text =="" || !myMessage.from == ""){
   return response.status(400).send("Enter your new message");
  } 
   const id = messages.length;
  myMessage.id =id;
  messages.push(myMessage);
  response.json("message successfully added");
   });

   //LEVEL 3
   app.get("/messages/search", function (request, response){
     const searchValue = request.query.term;
     const searchResults = messages.find(e.message ==text)
    //  const searchResults = messages.find((message)=>{
       return message.text.includes(searchValue);

     })
     response.json(searchResults);     
   })

// //read one message
app.get("/messages/:messageId", function(request, response){
  const {messageId}= request.params;
const getNewMessage = messages.find(message => message.id ==messageId);
response.json({myMessage});
  });
  //delete
  app.delete("/messages/deleteMessage/:id", function(request, response){
    const {id} = request.params;
    const deleteMessage = messages.filter((message)=>message.id !=id)
      response.json(messages)
  
    })
            


const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

