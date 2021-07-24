import React from "react";
import { useState,useEffect } from "react";
import 'firebase/auth';

import fire from "./firebase/firebase";
import Signin from "./Pages/Sign_in/Sign_in"
import Hero from './Pages/hero'

import './App.css';



function Login() {
    const [user,setuser] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    
    const [emailerror,setemailerror] = useState("");
    const [passworderror,setpassworderror] = useState("");
    const [hasaccount,sethasaccount] = useState(false);

    const fname = " ";
    const lname = " ";
    const dob = "01/01/0000";
    const mob = " ";

    const clearInput = () => {
        setemail("");
        setpassword("");
    };

    const clearerror = () => {
        setemailerror("");
        setpassworderror("");
    };

    
    const handlesignin = () => {
      clearerror();
      fire
          .auth()
          .createUserWithEmailAndPassword(email,password)
          .catch( err => {
              switch (err.code){
                  case "auth/email-already-in-use":
                  case "auth/invalid-email":
                      setemail(err.message);
                      break;
                  case "auth/weak-password":
                      setpassword(err.message);
                      break;
                  default:
                        break;
              }
          });
          const dataRef = fire.database().ref("Cus_Profile");
  };

  

  const handlelogin = () => {
    clearerror();
    fire
    .auth().signInWithEmailAndPassword(email, password)
        .catch( err => {
            switch (err.code){
                case "auth/user-diabled":
                case "auth/invalid-email":
                case "aith/user-not-found":
                    setemail(err.message);
                    break;
                case "auth/wrong-password":
                    setpassword(err.message);
                    break;
                default:
                  break;
            }
        });
};

const handlelogout = () => {
  fire.auth().signOut();
}   

    useEffect (() => {
      clearInput();
      fire.auth().onAuthStateChanged((user) => {
        if(user){
          setuser(user);
        } else{
            setuser("");
        }
    });
    },[]);

  return (
    
    <div>
      {user ? 
      (
        <Hero  handlelogout />
      ):(
        <Signin  
            email = {email}
            setemail = {setemail}
            password = {password}
            setpassword = {setpassword}
            emailerror = {emailerror}
            handlelogin = {handlelogin}
            handlesignin = {handlesignin}
            hasaccount = {hasaccount}
            sethasaccount = {sethasaccount}
            passworderror = {passworderror}
            
          />)}
    </div>
   
  );
};

export default Login;
