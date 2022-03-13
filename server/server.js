const express = require("express");
const cors = require("cors")
const fetch = require("node-fetch")
const formData = require("form-data")

const app = express()

app.use(express.json())
app.use(express.json({ type: "text/*" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/auth", (req,res)=> {

    const {code, clientId, clientSecret, redirectURL} =req.body;
    console.log(clientSecret)
    console.log(clientId)
    console.log(redirectURL)
   
    let data = new formData()
     data.append("client_id", clientId);
     data.append("client_secret", clientSecret);
     data.append("code", code);
     data.append("redirect_uri", redirectURL);

     // authenticating the user
     fetch(`https://github.com/login/oauth/access_token`, {
        method: "POST",
        body: data,
      })
        .then((response) => response.text())
        .then((paramsString) => {
          let params = new URLSearchParams(paramsString);
          var access_token = params.get("access_token");
          console.log("tok--", access_token)

            // returning user data
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

app.listen(4000, () => console.log(`Listening on 4000`));