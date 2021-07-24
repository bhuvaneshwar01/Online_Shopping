import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/firebase';
import { AddressItem } from './AddressItem';

export const Address_List = () => {
    const [addressList, SetaddressList] = useState();
    const user = firebase.auth().currentUser.email;

    useEffect(() => {
        const AddRef = firebase.database().ref('Address');
        AddRef
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
    }, []);

    return (
        <div>
            {addressList ? addressList.map((address, index) => <AddressItem address={address} key={index} />) : ''}
        </div>
    )
}
