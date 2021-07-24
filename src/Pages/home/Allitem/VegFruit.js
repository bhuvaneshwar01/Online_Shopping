import React, { useState } from 'react';
import Alertt from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import firebase, { storage } from "../../../firebase/firebase";
import classes from "./AllItem_list.module.css";
import FavoriteIcon from '@material-ui/icons/Favorite';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AllItem_item = ({ item }) => {

    const [Url, setUrl] = useState('');
    const [Count, setCount] = useState(0);
    const [Fav, setFav] = useState("grey");
    const [Alert, setAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const user = firebase.auth().currentUser.email;

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
      };

    const handleClose = () => {
        setOpen(false);
    };

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
        if (Count === 0) {
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
                        <div className={classes.ccard} onClick={handleClickOpen('paper')}>
                            <card>
                                <div className={classes.image}>
                                    <img src={Url} />
                                </div>
                                <div className={classes.content}>
                                    <h3>
                                        {item.Pname}
                                    </h3>
                                    <p className={classes.content}>Price : Rs.{item.Price}/-</p>
                                </div>

                            </card>
                        </div>
                        <div className={classes.ccard1} onClick={handleClickOpen}>
                            <div className={classes.action}>
                                <FavoriteIcon style={{ color: Fav }} onClick={HandleLike} />
                                <button className={classes.plus} onClick={() => setCount(Count - 1)}>-</button>
                                <input type="text" readOnly className={classes.countbox} value={Count} />
                                <button className={classes.plus} onClick={() => setCount(Count + 1)}>+</button>
                                <button className={classes.cartbtn} onClick={AddtoCart}>Add To Cart</button>
                            </div>
                        </div>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            maxWidth="lg"
                            keepMounted
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Product Details"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                <div className={classes.content}>
                                    <h3>
                                        {item.Pname}
                                    </h3>
                                <div>
                                    <img src={Url} className={classes.image1} />
                                </div>
                                    <h3 className={classes.content}>Price : Rs.{item.Price}/-</h3>
                                    <h3 className={classes.content}>Description :- </h3>
                                    <p className={classes.content}>{item.Desc}</p>
                                </div>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={AddtoCart} color="primary">
                                    Add to Cart
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {Alert ? <Alertt onClose={() => { setAlert(false) }}>Successfully added to the cart</Alertt> : ""}
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default AllItem_item;
