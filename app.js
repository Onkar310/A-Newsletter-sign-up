const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const https = require("https")

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: "true" }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    var firstName = req.body.First_Name;
    var lastName = req.body.Last_Name;
    var email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
        ]

    };

    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/def4ac4d2f"

    const options = {
        method: "POST",
        auth: "onkar310:b37f26965ad1ba41746dd0efb242de0c-us13"
    }

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    request.end();
})


app.post("/failure", (req, res) => {
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("server is running on port 3000");
})


// b37f26965ad1ba41746dd0efb242de0c-us13

//id
//def4ac4d2f