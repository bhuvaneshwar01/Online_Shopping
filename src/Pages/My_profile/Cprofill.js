import React from 'react'

import { useState } from "react";
import classes from "./Profile.module.css";
import firebase from "../../firebase/firebase";

function Cprofill() {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [dob, setdob] = useState("");
    const [mob, setMob] = useState("");
    const [Profile,SetProfile] = useState();
    const user = firebase.auth().currentUser.email;

    const handleProfile = () => {
        const dataRef = firebase.database().ref("Cus_Profile");

        const data = {
            fname,
            lname,
            user,
            dob,
            mob,
        };

        dataRef.push(data);
    }

    return (
        <div>
            <div className={classes.h}>            
                <form className={classes.form}>
                <div className={classes.control}>
                    <label >First Name</label>
                    <input
                        type="text"
                        margin="dense"
                        autoFocus
                        required
                        Placeholder="First Name"
                        value={fname}
                        onChange={(event) => setFname(event.target.value)}
                    />
                </div>
                <div className={classes.control}>
                    <label >Last Name</label>
                    <input
                        type="text"
                        margin="dense"
                        autoFocus
                        required
                        Placeholder="last Name"
                        value={lname}
                        onChange={(event) => setLname(event.target.value)}
                    />
                </div>
                <div className={classes.control}>
                    <label >UserName</label>
                    <input
                        type="text"
                        margin="dense"
                        autoFocus
                        required
                        value={user}
                        readOnly
                        Placeholder="username"
                    />
                </div>
                <div className={classes.control}>
                    <label >Date of Birth</label>
                    <input
                        type="Date"
                        margin="dense"
                        autoFocus
                        required
                        Placeholder="Date of Birth"
                        value={dob}
                        onChange={(event) => setdob(event.target.value)}
                    />
                </div>
                <div className={classes.control}>
                    <label >Mobile Number</label>
                    <input
                        type="text"
                        margin="dense"
                        autoFocus
                        required
                        Placeholder="Mobile Number"
                        value={mob}
                        onChange={(event) => setMob(event.target.value)}
                    />
                </div>
                <div>
                    <button type='button' className={classes.sbutton} onClick={handleProfile}>Submit</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Cprofill
