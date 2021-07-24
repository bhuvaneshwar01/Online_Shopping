import classes from './Sign_in.module.css';
import React from 'react';
const Sign_in = (props) => {

    const {
        email,
        setemail,
        password,
        setpassword,
        emailerror,
        handlelogin,
        handlesignin,
        hasaccount,
        sethasaccount,
        passworderror} = props;

    

    return (
    <div>
        <h1>Welcome to Online Shop</h1>
        <div className ={classes.card} >
            <form className ={classes.form} >
                <div className={classes.control}>
                    <label >Email</label>
                    <input 
                        type='text'  
                        autoFocus
                        required  
                        value = {email}
                        onChange={(event)=> setemail(event.target.value)} />
                    <p>{emailerror}</p>
                </div>
                <div className={classes.control}>
                    <label>Password</label>
                    <input 
                        type='password'  
                        required  
                        value = {password}
                        onChange={(event) => setpassword(event.target.value)} />
                    <p>{passworderror}</p>
                </div>
                <div>
                    {hasaccount ? (
                            <>
                                <button type='button' className={classes.sbutton} onClick = {handlelogin} >Login</button>
                                <p>dont have an account ? 
                                    <span onClick={() => sethasaccount(!hasaccount)}>Sign in</span>
                                </p>
                                                              
                            </>
                        ) : (
                            <>
                                <button type='button' className={classes.sbutton} onClick = {handlesignin} >sign in</button>
                                <p> have an account ? 
                                    <span onClick={() => sethasaccount(!hasaccount)}>Log in</span></p> 
                            </>
                        )
                    }
                </div>
            </form>
        </div>
    </div>
    );
}

export default Sign_in;