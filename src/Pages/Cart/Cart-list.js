import React,{useState,useEffect} from 'react'

import firebase from "../../firebase/firebase";
import Cart_item from "./Cart-item";

export default function Cart_list() {
    const [addressList, SetaddressList] = useState();
    
    useEffect(()=>{
        const Ref = firebase.database().ref('Cart');
        const user = firebase.auth().currentUser.email;
        Ref
            .orderByChild('user')
            .equalTo(user)
            .on('value', (snapshot) => {
                const address = snapshot.val();
                const addressList = [];
                for (let id in address) {
                    addressList.push({ id, ...address[id] });
                }
                SetaddressList(addressList);
            })
        },[]);

    return (
        <div>
             {addressList ? addressList.map((a, index)=> <Cart_item item = {a} key = {index} /> ) : ""}
        </div>
    )
}
