const { log } = require("console");
const express = require("express");
const https = require('https');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");

   // res.send("server is up and running"); //can not use more than one send method in a a js file
})

app.post("/", function(req, res) {
    
    const query = req.body.cityName;    
    console.log(query);
const apiKey = "12dcf0077f11fd544c46b3e7963530c5"
const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query +  "&appid=" + apiKey + "&units=metric";

    https.get(url, function(response){ // ye islie kiya kyuki dusre ke server se data access karna hai
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data); // converts strings to js object
           console.log(weatherData);
            // const object  = {
            //      name: "Neeraj",
            //      favouriteFood: "DalBati"
            // }
            // console.log(JSON.stringify(object)); // convert JS object into string
            const tempe = weatherData.main.temp;
            console.log(tempe);
            const weatherDesc = weatherData.weather[0].description;
            const wicon = weatherData.weather[0].icon;
            const ImageUrl = "https://openweathermap.org/img/wn/" + wicon +".png";
            console.log(weatherDesc);
            res.write("<p>The weather description is: " + weatherDesc + " <p>"); // isko paragraph me dalna imp hai
            res.write("<h1>The temperature in " + query + "is : " + tempe  + " degree celsius</h1>");
            res.write("<img src=" + ImageUrl + ">");    
            res.send();

        } )
    })
} )




app.listen(3000, function(){
    console.log("server is runnign on port 3000.");
})

