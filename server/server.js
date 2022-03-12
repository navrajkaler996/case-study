//   });
const express = require("express");
const cors = require("cors")
const fetch = require("node-fetch")
const formData = require("form-data")


const app = express()

app.use(express.json())
app.use(express.json({ type: "text/*" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use((req, res, next) => {

//     res.header("Access-Control-Allow-Origin", "*");

app.use("/getToken", (req, res, next)=> {

  const {code, clientId, clientSecret, redirectURL} =req.body;
    console.log(clientSecret)
    console.log(clientId)
    console.log(redirectURL)
    console.log(code)
    let data = new formData()

    console.log("------")
     data.append("client_id", clientId);
     data.append("client_secret", clientSecret);
     data.append("code", code);
     data.append("redirect_uri", redirectURL);
     console.log("------")
    
     fetch(`https://github.com/login/oauth/access_token`, {
        method: "POST",
        body: data,
      })
        .then((response) => response.text())
        .then((paramsString) => {
          let params = new URLSearchParams(paramsString);
          var access_token = params.get("access_token");
        
          return fetch(`https://api.github.com/user/repos`, {
            headers: {
              Authorization: `token ${access_token}`,
            },
          });
        })
        .then((response) => response.json())
        .then((response) => {
          
          return res.status(200).json(response);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });

})

app.use("/auth", (req,res, next)=> {

    const {code, clientId, clientSecret, redirectURL} =req.body;
    console.log(clientSecret)
    console.log(clientId)
    console.log(redirectURL)
   
    let data = new formData()
     data.append("client_id", clientId);
     data.append("client_secret", clientSecret);
     data.append("code", code);
     data.append("redirect_uri", redirectURL);
    
     fetch(`https://github.com/login/oauth/access_token`, {
        method: "POST",
        body: data,
      })
        .then((response) => response.text())
        .then((paramsString) => {
          let params = new URLSearchParams(paramsString);
          var access_token = params.get("access_token");
          console.log("tok--", access_token)
          // Request to return data of a user that has been authenticated
          return fetch(`https://api.github.com/user`, {
            headers: {
              Authorization: `token ${access_token}`,
            },
          });
        })
        .then((response) => response.json())
        .then((response) => {
          
          return res.status(200).json(response);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
})

const getUserData = async (formData) => {

    
}



app.listen(4000, () => console.log(`Listening on 4000`));