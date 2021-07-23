const { urlencoded } = require('express');
const express=require('express');
const app=express();
const path=require('path');
require('./db/connection');
const Dbuser=require('./model/user_db');
const bcryptjs=require("bcryptjs");
//const jwt=require('jsonwebtoken');
const cookie=require('cookies');





//parth direction
const publicPath=path.join(__dirname,"../public");
const partialsPath=path.join(__dirname,"../Template");
const viewPath=path.join(__dirname,"../Template/views");


//use as middleware
app.use(express.static(publicPath));
//we getting filled data 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","hbs");
app.set("views",viewPath);



app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/test",(req,res)=>{
    res.render("test");
})
app.post("/test",async(req,res)=>{
    try {
       const {User_name ,User_email , User_phone , User_pass ,User_cpass} =req.body;
       //if we not want to save cpass
       //const User_cpass=req.body.User_cpass;
       if( !User_name || !User_email || ! User_phone || ! User_pass || ! User_cpass){
          return res.json({error:"please filled every box..."});

       }
       const userExists=await Dbuser.findOne({email: User_email});
                if (userExists){
                    return res.status(422).json({error:"Email already use"});
                }
             const emp=new Dbuser({name:User_name ,email:User_email ,phone: User_phone , pass:User_pass ,cpass: User_cpass});
             if (User_cpass===User_pass){
                //const hashPass=await bcryptjs.hash(User_pass,10);
                //pass:hashPass;
                //by using schema_name.pre('save',async fn(next){//hashing fn in Schema Folder})
                 const ragistered=await emp.save();
                 res.render("index");   
             }else {
                return  res.status(422).json({massage:"password not matching..." });
             }
             
             
    } catch (error) {
        console.log("error");
    }
   
    
});

// app.get("/aboutMe",checkMiddleware,(req,res)=>{
//     res.send("Hello From AboutMe");
// })
app.get("/contact",(req,res)=>{
    res.send("Hello From Contact");
})
app.get("/signUp",(req,res)=>{
    res.send("Hello From signUp");
})



//loginPage
app.get("/signIn",(req,res)=>{
    res.render("signIn");
})
app.post("/signIn",async(req,res)=>{
    try {
        const {signIn_email,signIn_pass}=req.body;
        if (!signIn_email|| !signIn_pass){
           return res.send("Fill all Box...");
        }
        const signIn_Userdb=await Dbuser.findOne({email:signIn_email});
        const isMatching=await bcryptjs.compare(signIn_pass,signIn_Userdb.pass);
        const token= await signIn_Userdb.generateAuthToken();
        // res.cookie("jwtoken",token,{
        //     expires:new Date(Date.now()+10000),
        //     httpOnly:true
        // });
        
        if (signIn_Userdb && isMatching){

            res.send(`SignIn successfully...`);
            //console.log(signIn_Userdb);

        }else{
            res.send("Not matching.....!!");
            console.log("not matching..");
        }
        
    } catch (error) {
        console.log("noooooooo...........");
        
    }
    
})

app.listen(8080,()=>{
    console.log("Started....");
});