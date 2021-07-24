import { useState,useEffect } from "react";

import firebase from "../../firebase/firebase";
import C_Profile_View from "./C_Profile_View";
import classes from "./Profile.module.css";

const C_Profile = () => {

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
    
    useEffect(() => {
        const ref = firebase.database().ref('Cus_Profile');
        
        ref
            .orderByChild('user').equalTo(user)
            .on('value',(snapshot) => {
                const prof = snapshot.val();
                const P = [];
                for(let id in prof){
                    P.push({id,...prof[id]});
                }
                SetProfile(P);
            })
    }, [])
    console.log(Profile);
    return (
       <div>
            <p className={classes.head}>Profile</p>
           {Profile ? Profile.map((prof,index) => <C_Profile_View item = {prof} key = {index} />
           ) : " "
           }
            
        </div>
    );
}
export default C_Profile;