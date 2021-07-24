import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Alertt from '@material-ui/lab/Alert';

import firebase, { storage } from "../../firebase/firebase";
import classes from './Cart.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart_item({ item }) {
    const [Url, setUrl] = useState('');
    const [Count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [Alert, setAlert] = useState(false);
    const [addressList, SetaddressList] = useState();
    const [doorno,setdoorno] = useState("");
    const [CurrDate, setCurrDate] = useState("");
    const [DelDate, setDelDate] = useState("");
    const [Prices, setPrices] = useState(0);
    const [Open2, setOpen2] = useState(false);
    const user = firebase.auth().currentUser.email;

    const ref = storage.ref("images").child(item.i).getDownloadURL()
        .then(url => {
            setUrl(url)
        });

    useEffect(() => {
        setCount(item.Quantity);
        const i =item.Price;
        setPrices(Count);
        const ref = firebase.database().ref('Address');
        ref
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
    }, [])
    console.log(addressList);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClose2 = () => {
        setOpen1(false);
        setOpen2(false);
    };

    const handleClickOpen2 = () => {
        setOpen1(false);
        setOpen2(true);
        
    }

    const handleClickOpen1 = () => {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        const currDate = date;
        var someDate = new Date();
        var numberOfDaysToAdd = 6;
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        const d = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + someDate.getDate();
        console.log(d);
        setDelDate(d);
        setCurrDate(currDate)
        setOpen1(true);
        setOpen(false);
    }

    const HandleDelete = () => {
        const r = firebase.database().ref('Cart').child(item.id).remove();
    }

    const handleCountinc = () => {
        setCount(Count + 1);
        console.log(Prices);
    }

    const handleCountdec = () => {
        setCount(Count - 1);
        console.log(Prices);
    }

    const HandleOrder = () => {
        const r = firebase.database().ref('Order');
        var Quantity = Count;
        if(Count == 0){
            Quantity = 1;
        }
        const Pname = item.Pname;
        const Desc = item.Desc;
        const Price = Prices;
        const addressId = doorno;
        const i = item.i;
        const Category = item.Category;
        const current_date = CurrDate;
        const delivery_date = DelDate;
        const data = {
            Pname,
            Desc,
            Price,
            i,
            Category,
            Quantity,
            user,
            addressId,
            current_date,
            delivery_date,
        }

        r.push(data);
        setAlert(true);
        firebase.database().ref('Cart').child(item.id).remove();
        setOpen(false);
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
                                    <p className={classes.content}>Price : Rs.{item.Price*Count}/-</p>
                                </div>

                            </card>
                        </div>
                        <div className={classes.ccard1}>
                            <div className={classes.action}>
                                <button className={classes.plus} onClick={handleCountdec}>-</button>
                                <input type="text" readOnly className={classes.countbox} value={Count} />
                                <button className={classes.plus} onClick={handleCountinc}>+</button>
                                <button className={classes.cartbtn} onClick={handleClickOpen}>Buy now</button>
                                <button className={classes.deletebtn} onClick={HandleDelete}>Delete</button>
                                <Dialog
                                    open={open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle id="alert-dialog-slide-title">{" STEP 1 : Select address"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                        <select className={classes.text_input} value={doorno} onChange={(e)=>setdoorno(e.target.value)}>
                                            {addressList ? addressList.map((prof,index) => 
                                                <option key = {index} value={prof.DoorNo}>{prof.DoorNo},{prof.Apartment},{prof.Street},{prof.City},{prof.State},{prof.Pin}</option>
                                            ) : <option>None</option>}
                                        </select> 
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleClickOpen1} color="primary">
                                            Next
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog
                                    open={open1}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle id="alert-dialog-slide-title">{" Final Step "}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            You ordered on {CurrDate} .You can get this item on {DelDate} . If you dont click cancel button {'\n'}
                                            Payment mode : Cash on delivery
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose1} color="primary">
                                            Cancel
                                        </Button>
                                        <Button  color="primary" onClick={HandleOrder}>
                                            Confirm
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                
                            </div>
                            {Alert ? <Alertt onClose={() => {setAlert(false)}}>Successfully Ordered!!</Alertt> : ""}
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    )
}
