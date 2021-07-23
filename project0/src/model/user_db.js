const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const dotenv=require('dotenv');
dotenv.config({path:"./config.env"});



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    cpass:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})





//we are StoringPass in form of hashing.
//here we are not using ()={} fn because this keyword not working. 
userSchema.pre('save',async function (next){
    if(this.isModified('pass')){
        this.pass=await bcryptjs.hash(this.pass,12);  
        this.cpass=await bcryptjs.hash(this.cpass,12);  
    }
    next();

});
//here we generate token
userSchema.methods.generateAuthToken=async function(){
   try {
       let tokeng=jwt.sign({_id:this._id},process.env.SECRET_KEY);
       this.tokens = this.tokens.concat({token:tokeng});
       await this.save();
       return tokeng;
  
   } catch (error) {
       console.log("not generated token");
   }
}
//




const Dbuser=new mongoose.model("Dbuser",userSchema);

module.exports=Dbuser;

