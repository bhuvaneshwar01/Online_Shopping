import React,{useState,useEffect} from "react";

import firebase from "../../firebase/firebase";
import AllItem_item from "./Allitem/AllItem_item";

const AllItem = () => {
    const [addressList, SetaddressList] = useState();

    useEffect(() => {
        const AddRef = firebase.database().ref('Product');
        const user = firebase.auth().currentUser.email;
        AddRef
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
            
            {addressList ? addressList.map((a, index)=> <AllItem_item item = {a} key = {index} /> ) : ""}
        </div>
    );
}

export default AllItem;