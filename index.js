const express = require('express');
const app = express();
const { google } = require("googleapis");
const SCOPES = "https://www.googleapis.com/auth/firebase.messaging";

app.get('/',(req,res)=>{
    res.status(200).send({
        message : "node is firing properly!",
    })
})


const getAccessToken = async () => {
    return new Promise(function (resolve, reject) {
      const key = require("./fcm.json");
      const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
      );
  
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        console.log(tokens.access_token);
        
        resolve(tokens.access_token);
      });
    });
  };

  app.use('/token',async (req,res)=>{
    const token = await getAccessToken();
    res.status(200).send({
        message : token
    })
})




const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Server started on Port ${port}`));
