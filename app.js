const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",(req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const mail = req.body.mail;

    const data ={
        members:[
            {
                email_address : mail,
                status : "subscribed",
                merge_fiels : {
                    FNAME : firstName,
                    LNAME : lastName
                }

            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/72d8c58f55";
    const options ={
        method : "POST",
        auth : "Arsh07:a24366da6df585df1693b850d4135b2c8-us21"
    }


    const request=https.request(url,options,(response)=>{

        if(response.statusCode ===200){
            res.sendFile(__dirname + "/success.html");
        }

        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});


app.post("/failure",(req,res)=>{
    res.redirect("/")
})




app.listen(process.env.PORT || 3000 ,()=>{
    console.log("Server live at port 3000");
});


