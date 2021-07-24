import classes from './Sign_in.module.css';

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
                    {
                        hasaccount ? (
                            <>
                                <button className={classes.sbutton} type="button" onClick = {handlelogin} >Login</button>
                                <p>dont have an account ? <span onClick = {() => sethasaccount(!hasaccount)}>sign in</span></p>
                            </>
                        ) : (
                            <>
                                <button className={classes.sbutton} type="button" onClick = {handlesignin} >sign in</button>
                                <p> have an account ? <span onClick = {() => sethasaccount(!hasaccount)}>log in</span></p>
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