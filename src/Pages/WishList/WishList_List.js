import React,{useState,useEffect} from 'react'

import firebase from "../../firebase/firebase";
import WishList_Item from "./WishList_Item";

export default function Cart_list() {
    const [addressList, SetaddressList] = useState();
    
    useEffect(()=>{
        const Ref = firebase.database().ref('Wishlist');
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
             {addressList ? addressList.map((a, index)=> <WishList_Item item = {a} key = {index} /> ) : ""}
        </div>
    )
}
