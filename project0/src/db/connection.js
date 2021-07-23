const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:"./config.env"});

//pass===>dbProject0
//username===>db_project0
//mongodb+srv://db_project0:<password>@cluster0.taoq1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//DB=process.env.DATABASE;
//process.env.DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/test1",
{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true})
.then(()=>{
    console.log("Sucssefully...");
    
})
.catch((err)=>{
    console.log('no connection');
})
