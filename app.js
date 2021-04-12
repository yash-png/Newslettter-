const express= require("express")
const https=require("https")
const bodyParser=require("body-parser")
const request= require("request");
const { response } = require("express");
const app=express(); 

app.use(express.static("public")) 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){

    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const Email=req.body.email;
    var Data={
        members:[
        {
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
        
    ]
    };
        const jsonData=JSON.stringify(Data);
        const url= "https://us1.api.mailchimp.com/3.0/lists/8d3838ea5a";
        const options={
            method:"POST",
            auth:"yash1:0ab19810655f6935f4ed53271e18c77-us1"
        };
        const request= https.request(url,options, function(response){
            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }else{
                res.sendFile(__dirname+"/failure.html");
            }
         response.on("data",function(Data){
            console.log(JSON.parse(Data));
        })
  
})
request.write(jsonData);
request.end();
});
app.post("/failure", function(req,res){
    res.redirect("/")
})
app.listen(process.env.PORT || 3000, function(req,res){
     console.log("Server is running on port 3000");
}); 