import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import './CSS/sapp.css';


const SignUp = () => {
  const history=useHistory()
  const [user, setData] = useState({ fname: "", lname: "", emailid: "" });
  let name, value;
  const inputData = (event) => {
    name = event.target.name;//it returns the name attributes
    value = event.target.value;//value of name attributes
    setData({ ...user, [name]: value });
  }

  const postData=async (event)=>{
    event.preventDefault();
    const { fname, lname, emailid }=user;
    const res=await fetch("/test",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body : JSON.stringify({
          User_name :fname,User_email:emailid , User_phone:1234566 , User_pass:lname ,User_cpass:1234
        })
    });
    const data=await res.json()
    if (res.status===422 ||!data){

    }else{
      console.log("successfull");
      history.pushState("/signIn");
    }

  }


  return (
    <>
      <div className="form">
        <div className="title">Welcome</div>
        <div className="subtitle">Let's create your account!</div>
        <div className="input-container ic1">
          <input id="firstname" className="input" type="text" placeholder=" " name="fname" onChange={inputData} value={user.fname} />
          <div className="cut"></div>
          <label for="firstname" className="placeholder">firstname</label>
        </div>
        <div className="input-container ic2">
          <input id="lastname" className="input" type="text" placeholder=" " name="lname" onChange={inputData} value={user.lname} />
          <div className="cut"></div>
          <label for="lastname" className="placeholder">Last name</label>
        </div>
        <div className="input-container ic2">
          <input id="email" className="input" type="text" placeholder=" " name="emailid" onChange={inputData} value={user.emailid} />
          <div className="cut cut-short"></div>
          <label for="email" className="placeholder">Email</label>
        </div>
        <input type="submit" className="submit" onClick={postData}>submit</input>
      </div>
    </>
  )
}

export default SignUp;