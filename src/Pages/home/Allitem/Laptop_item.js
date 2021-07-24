import React, { useState } from 'react';
import Alertt from '@material-ui/lab/Alert';


import firebase, { storage } from "../../../firebase/firebase";
import classes from "./AllItem_list.module.css";
import FavoriteIcon from '@material-ui/icons/Favorite';

const AllItem_item = ({ item }) => {

    const [Url, setUrl] = useState('');
    const [Count, setCount] = useState(0);
    const [Fav, setFav] = useState("grey");
    const [Alert, setAlert] = useState(false);

    const user = firebase.auth().currentUser.email;

    

    storage.ref("images").child(item.i).getDownloadURL()
        .then(url => {
            setUrl(url)
        });

    const HandleLike = () => {
        setFav("red");
        const r = firebase.database().ref('Wishlist');
        const Pname = item.Pname;
        const Desc = item.Desc;
        const Price = item.Price;
        const i = item.i;
        const Quantity = Count;
        const Category = item.Category;
        const data = {
            Pname,
            Desc,
            Price,
            i,
            Quantity,
            Category,
            user,
        }

        r.push(data);
    }

    const AddtoCart = () => {
        const r = firebase.database().ref('Cart');
        var Quantity = Count;
        if(Count === 0){
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
        setAlert(true);
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
                                    
                                    <p className={classes.content}>Price : {item.Price}</p>
                                </div>

                            </card>
                        </div>
                        <div className={classes.ccard1}>
                            <div className={classes.action}>
                                <FavoriteIcon style={{ color: Fav }} onClick={HandleLike} />
                                <button className={classes.plus} onClick={() => setCount(Count - 1)}>-</button>
                                <input type="text" readOnly className={classes.countbox} value={Count} />
                                <button className={classes.plus} onClick={() => setCount(Count + 1)}>+</button>
                                <button className={classes.cartbtn} onClick={AddtoCart}>Add To Cart</button>
                            </div>
                        </div>
                        {Alert ? <Alertt onClose={() => {setAlert(false)}}>Successfully added to the cart</Alertt> : ""}
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default AllItem_item;
