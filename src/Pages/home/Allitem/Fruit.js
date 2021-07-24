import React,{useState,useEffect} from "react";

import firebase from "../../../firebase/firebase";
import Fruit_item from "./VegFruit";

const AllItem = () => {
    const [addressList, SetaddressList] = useState();

    useEffect(() => {
        const AddRef = firebase.database().ref('Product');
        const user = firebase.auth().currentUser.email;
        AddRef
            .orderByChild('Category')
            .equalTo('Fruit')
            .on('value', (snapshot) => {
                const address = snapshot.val();
                const addressList = [];
                for (let id in address) {
                    addressList.push({ id, ...address[id] });
                }
                SetaddressList(addressList);
            })
    }, []);

    return (
        <div>
            
            {addressList ? addressList.map((a, index)=> <Fruit_item item = {a} key = {index} /> ) : ""}
        </div>
    );
}

export default AllItem;