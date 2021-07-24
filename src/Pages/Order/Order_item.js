import React, { useState,useEffect } from 'react';

import firebase, { storage } from "../../firebase/firebase";
import classes from "./Order.module.css";

const AllItem_item = ({ item }) => {

    const [Url, setUrl] = useState('');
    const [addressList, SetaddressList] = useState();
    const user = firebase.auth().currentUser.email;
    const id = item.addressId;


    const ref = storage.ref("images").child(item.i).getDownloadURL()
        .then(url => {
            setUrl(url)
        });

        useEffect(() => {
            const ref = firebase.database().ref('Address');
            ref
            .orderByChild('DoorNo')
            .equalTo(item.addressId)
            .on('value', (snapshot) => {
                const address = snapshot.val();
                const addressList = [];
                for (let id in address) {
                    addressList.push({ id, ...address[id] });
                }
                SetaddressList(addressList);
            })
        }, [])
        console.log(item.addressId);
    return (
        <div>
            <ul className={classes.list}>
                <div className={classes.Margin}>
                    <li className={classes.item}>
                        <div className={classes.ccard}>
                            <card>
                                <div className={classes.image}>
                                    <img src={Url} />
                                </div>
                                <div className={classes.content}>
                                    <h3>
                                        {item.Pname}
                                    </h3>
                                    <p className={classes.content}>Decription : {item.Desc} </p>
                                    <p className={classes.content}>Price : Rs.{item.Price * item.Quantity}/-</p>
                                    <p className={classes.content}>Quantity : {item.Quantity}</p>
                                </div>
                                <p  className={classes.content} >Delivering to
                                {
                                    addressList ? addressList.map((prof,index) =>
                                    <p key = {index}>{prof.DoorNo},{prof.Apartment},{prof.Street},{prof.City},{prof.State},{prof.Pin}</p>
                                    ) : ""
                                }
                                </p>
                                <p  className={classes.content}>Ordered on : {item.current_date}</p>
                                <p  className={classes.content}>Delivery on : {item.delivery_date}</p>
                            </card>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default AllItem_item;
