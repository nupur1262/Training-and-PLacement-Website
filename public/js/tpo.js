const express=require("express");
const app=express();
const body_parser=require("body-parser");
app.set("view-engine","ejs");
app.use(body_parser.urlencoded({extended: true}));
app.use(express.static("public"));


    
function home_page(req,res)
{
    res.sendFile(__dirname+"/index.html");
}


function student_login_page(req,res){
    res.sendFile(__dirname+"/login2.html");
}

//  app.post("/lo")

app.get("/",home_page);
app.get("/student",student_login_page);
// app.get("/student",student_profile);
// app.get("/company",company_login_page);
// app.get("/company",company_profile);
// app.get("/downloads",downloads);
// app.get("/logout",logout);
// app.get("/badway",false_attempt);

app.listen(3000,function(){
    console.log("server started at 3000");
})