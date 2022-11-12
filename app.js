console.log("connected");
'use strict';

const express=require("express");
const cors=require('cors');
const config=require('./config');
const bodyParser=require("body-parser");
const firebase=require('./firebase');
const fun=require("./public/js/file.js");
const { application } = require("express");
const { applicationDefault } = require("firebase-admin/app");
  

const app=express();
app.set("view-engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());


var cnt=0;
cnt2=0;


function check_email(email1)
{
  var email=String(email1);
  console.log("Checking email");
  if(email.endsWith('@jcboseust.ac.in') && (email.slice(0,11)-'0')===( parseInt(email.slice(0,11))) && email.length==27)
    return true;
  return false;
}
function student_details(email)
{
  const dbRef = firebase.database().ref();
  dbRef.child("TPO/Student").child(email).get().then((snapshot) => 
  {
      if (snapshot.exists()) 
      {
        var name1=snapshot.val().name;
        console.log("hii");

        var obj=
        {
        name:'Nupur',
        RollNo:19001003078,
        College:'YMCA',
        EmailId:'ghhvjb',
        PhoneNo:7290899222
        };
        return obj;
      } 
      else 
      {
        console.log("No data available");
      }
  }).catch((error) => {
  console.error(error);});
  return obj;
}

//home Page
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

//student login page
app.get("/stlogin",function(req,res){
    res.sendFile(__dirname+"/public/html/login2.html");
})
app.post("/stlogin",function(req,res){
    var email=req.body.myEmail;
    const pass=req.body.myInput;

    firebase.auth().signInWithEmailAndPassword(email, pass).then((userCredential) => 
    {
    // Signed in
    //console.log("helooooooooooooo")
    var user = userCredential.user;
    //console.log("Logged-in Successfully");

    const RollNo=email.slice(0,11);
    const dbRef = firebase.database().ref();
    dbRef.child("TPO/Student").child(RollNo).get().then((snapshot) => {
    if (snapshot.exists()) 
    {
      //console.log("hii");
      var obj =snapshot.val();
      console.log(obj);
      if(obj["applied_to"]==null){obj.applied_to=0;}
      /*{
        name:snapshot.val().name,
        RollNo:RollNo,
        College:'YMCA',
        EmailId:email,
        PhoneNo:0,
        comp_name:"My Company"
      };*/
      res.render("stud_profile.ejs",obj);
    } 
    else 
    {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
   
  })
  .catch((error) => {
    console.log("Incorrect username/Password");
    //res.sendFile(__dirname+"/badway.html");
    res.render("badway.ejs",{'msg':'Incorrect Credentials','redirect':'stlogin'});
  });
})

app.get("/streg",function(req,res){
    res.sendFile(__dirname+"/public/html/login2.html");
})
app.post("/streg",function(req,res)
{
  
    cnt+=1;
    var name1=req.body.sName;
    var email1=req.body.sEmail;
    var pass =req.body.sPassword;
  
    if(check_email(email1))
    {
      firebase.auth().createUserWithEmailAndPassword(email1, pass).then((userCredential) => {
          console.log('Registered Successfully');
      var user = userCredential.user;
      //window.location.assign("/stlogin");
    })
      .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
     });
    }
    else
    {
      if(!check_email(email1))
      {
      console.log("Enter Correct Email Id");
      res.render("badway.ejs",{'msg':'Enter correct E-mail id','redirect':'stlogin'});
      //window.alert("Enter Correct Email Id");
      //document.forms["registration"]["sEmail"].focus();
      }
    }

    email1=String(email1);
    const RollNo = email1.slice(0,11);
    console.log(RollNo);

      firebase.database().ref('TPO/Student/'+RollNo).set({
        name:name1,
        email:email1
      }).then(() => {
        res.redirect("/stlogin");
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    }   
)

app.get("/rlogin",function(req,res){
  res.sendFile(__dirname+"/public/html/rlogin.html");
})
app.post("/rlogin",function(req,res)
{
  var obj;
    var user1=req.body.username;
    const pass=req.body.myInput2;
    const dbRef = firebase.database().ref();
    dbRef.child("TPO/Recruiter").child(user1).get().then((snapshot) => {
  if (snapshot.exists()) 
  {
    var email=snapshot.val().email;


    //console.log(snapshot.val());
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Logged-in Successfully");

       obj =snapshot.val();
       obj.Username=user1;
       if(obj["hr_num"]==null){obj.hr_num="";}
       if(obj["hr_name"]==null)obj.hr_name="";
       if(obj["applications"]==null)obj.applications=[];
       if(obj["stu_applied"]==null)obj.stu_applied=0;
      console.log(obj);
      
      res.render("rec_profile.ejs",obj);
    })
    .catch((error) => {
      console.log("Incorrect username/Password");
      //res.sendFile(__dirname+"/badway.html");
      res.render("badway.ejs",{'msg':'Incorrect Credentials','redirect':'rlogin'});
    });
  } 
  else 
  {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
})

app.get("/rreg",function(req,res){
  res.sendFile(__dirname+"/public/html/rlogin.html");
})
app.post("/rreg",function(req,res)
{
  var name11=req.body.comp_name;
  const dbRef = firebase.database().ref();
  dbRef.child("TPO/Recruiter").get().then((snapshot) => {
    if (snapshot.exists()) 
    {
      console.log(snapshot.val());
      myobj=snapshot.val();

      var size1 = Object.keys(myobj).length;
      for(i=1;i<=size1;i++)
      {
        var comp="comp"+i;
        console.log(comp);
        if(myobj[comp].name==name11)
        {
          //res.sendFile(__dirname+"/badway.html");
          res.render("badway.ejs",{'msg':'You have already Registered','redirect':'rlogin'});
          return;
        }
      }
      

      cnt2+=1;



  var name1=req.body.comp_name;
  var email1=req.body.rEmail;
  var pass =req.body.rPassword;

    firebase.auth().createUserWithEmailAndPassword(email1, pass).then((userCredential) => {
        console.log('Registered Successfully');
    var user = userCredential.user;
    //res.redirect('/rlogin');
    //window.location.assign("/stlogin");
  })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    //res.redirect('/rlogin');
   });
  


   //console.log(cnt2);
  var comp ="comp"+String(cnt2);

    firebase.database().ref('TPO/Recruiter/'+comp).set({
      name:name1,
      email:email1
    }).then(() => {
      res.render("alert.ejs",{comp});
      //res.redirect("/rlogin");
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  
    }
    else{
      cnt2+=1;



  var name1=req.body.comp_name;
  var email1=req.body.rEmail;
  var pass =req.body.rPassword;

    firebase.auth().createUserWithEmailAndPassword(email1, pass).then((userCredential) => {
        console.log('Registered Successfully');
    var user = userCredential.user;
    //res.redirect('/rlogin');
    //window.location.assign("/stlogin");
  })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    //res.redirect('/rlogin');
   });
  


   //console.log(cnt2);
  var comp ="comp"+String(cnt2);

    firebase.database().ref('TPO/Recruiter/'+comp).set({
      name:name1,
      email:email1
    }).then(() => {
      res.render("alert.ejs",{comp});
      //res.redirect("/rlogin");
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    }
       
    });

})

app.get("/Curr_Rec",function(req,res){
  const dbRef = firebase.database().ref();
  dbRef.child("TPO").child("Recruiter").get().then((snapshot) => {
    if (snapshot.exists()) 
    {
      myobj=snapshot.val();
      //console.log(myobj);
      res.render("CurrentRecruiters.ejs",myobj);
    } 
    else 
    {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  //const myobj={}
    
})
app.get("/AdminLogin",function(req,res){
    res.sendFile(__dirname+"/public/html/admin.html");
})
app.get("/company",function(req,res){
  res.sendFile(__dirname+"/public/html/company.html");
})
app.post("/company",function(req,res)
{

  comp=req.body.username;
  hr_name1=req.body.hr_name;
  hr_num1=req.body.hr_num;
  details1=req.body.details;
  last_date1 =req.body.last_date;
 
  var name1;
  var email1;
  const dbRef = firebase.database().ref();
  dbRef.child("TPO/Recruiter").child(comp).get().then((snapshot) => {
    if (snapshot.exists()) 
    {
      name1=snapshot.val().name;
      email1=snapshot.val().email;
      firebase.database().ref('TPO/Recruiter/'+comp).set({
        name:name1,
        email:email1,
        hr_name:hr_name1,
        hr_num:hr_num1,
        details:details1,
        last_date:last_date1,
        selected:0,
        stu_applied:0,
        applications:[]
      }).then(() => {
        res.redirect("/rlogin");
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    } 
    else 
    {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
})
app.get("/Downloads",function(req,res){
    res.sendFile(__dirname+"/public/html/download.html");
})
app.get("/records",function(req,res){
  res.sendFile(__dirname+"/public/html/record.html");
})

app.post("/details",function(req,res){
  //console.log(req.body);
  comp=req.body.comp;
  var obj;
  const dbRef = firebase.database().ref();
  dbRef.child("TPO/Recruiter").child(comp).get().then((snapshot) => {
    if (snapshot.exists()) 
    {
      obj=snapshot.val();
      console.log(obj);
      res.render("company_details.ejs",obj);
    } 
    else 
    {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
})

app.get("/student_form",function(req,res){
  res.sendFile(__dirname+"/public/html/student.html");
})

app.post("/student",function(req,res)
{
  name_of_student=req.body.name;
  rollno_of_student=req.body.rollno;
  username_of_company=req.body.username;
  email_of_student=req.body.email;
  passing_year=req.body.year;
  resume=req.body.resume;





//adding roll number of student in application list in company database
  const dbRef = firebase.database().ref();
  dbRef.child("TPO/Recruiter").child(username_of_company).child("applications").get().then((snapshot) => {
    if (snapshot.exists())
    {
      console.log(snapshot.numChildren())
      var val=snapshot.numChildren()+1;
      var updates = {};
      updates["applications/"+val] = rollno_of_student;
      firebase.database().ref().child("TPO/Recruiter").child(username_of_company).update(updates);
    }
    else
    {
      var updates = {};
      updates[username_of_company+"/applications/1"] = rollno_of_student;
      firebase.database().ref().child("TPO/Recruiter").update(updates);
    }
  })

  //increasing the number of stu_applied in company database
  dbRef.child("TPO/Recruiter").child(username_of_company).get().then((snapshot) => {
    if (snapshot.exists())
    {
      var val=snapshot.val().stu_applied;
      var updates = {};
      updates["stu_applied"] = val+1;
      firebase.database().ref().child("TPO/Recruiter").child(username_of_company).update(updates);
    }
  })

//adding the company to student database
dbRef.child("TPO/Student").child(rollno_of_student).child("applied_to").get().then((snapshot) => {
  if (snapshot.exists())
  {
    //console.log(snapshot.val())
    var val=snapshot.numChildren()+1;
    var updates = {};
    
    updates[rollno_of_student+"/applied_to/"+val] = username_of_company;
    firebase.database().ref().child("TPO/Student").update(updates);
  }
  else
  {
    var updates = {};
    updates[rollno_of_student+"/applied_to/1"] = username_of_company;
    firebase.database().ref().child("TPO/Student").update(updates);
  }
})
res.redirect("/stlogin");
})
app.listen(8080,function(){
    console.log("server started at 3000");
});