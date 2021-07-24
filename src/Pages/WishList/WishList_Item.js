import React, { useState } from 'react';

import firebase, { storage } from "../../firebase/firebase";
import classes from "./WishList.module.css";

const AllItem_item = ({ item }) => {

    const [Url, setUrl] = useState('');
    const [Count, setCount] = useState(0);

    const user = firebase.auth().currentUser.email;


    const ref = storage.ref("images").child(item.i).getDownloadURL()
        .then(url => {
            setUrl(url)
        });

    const HandleLike = () => {
        const r = firebase.database().ref('Wishlist').child(item.id).remove();
        
    }

    const AddtoCart = () => {
        const r = firebase.database().ref('Cart');
        var Quantity = Count;
        if(Count == 0){
            Quantity = 1;
        }
        const Pname = item.Pname;
        const Desc = item.Desc;
        const Price = item.Price;
        
        const i = item.i;
        const Category = item.Category;
        const data = {
            Pname,
            Desc,
            Price,
            i,
            Category,
            Quantity,
            user,
        }

        r.push(data);
    }

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
                                    <p>Decription : {item.Desc} </p>
                                    <p className={classes.content}>Price : Rs.{item.Price}/-</p>
                                </div>

                            </card>
                        </div>
                        <div className={classes.ccard1}>
                            <div className={classes.action}>
                                <button onClick={HandleLike} className={classes.deletebtn}>Remove</button>
                                <button className={classes.plus} onClick={() => setCount(Count - 1)}>-</button>
                                <input type="text" readOnly className={classes.countbox} value={Count} />
                                <button className={classes.plus} onClick={() => setCount(Count + 1)}>+</button>
                                <button className={classes.cartbtn} onClick={AddtoCart}>Add To Cart</button>
                            </div>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default AllItem_item;
