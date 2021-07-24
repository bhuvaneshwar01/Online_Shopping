import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import React from "react";
import TextField from '@material-ui/core/TextField';

import firebase from "../../firebase/firebase";
import {Address_List} from "./Address_List";
import classes from "./Profile.module.css";

function Address() {
    const [DoorNo, SetDoorNo] = useState("");
    const [Apartment, SetApartment] = useState("");
    const [City, SetCity] = useState("");
    const [Street, SetStreet] = useState("");
    const [State, SetState] = useState("");
    const [Pin, SetPin] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleData = () => {
        const dataRef = firebase.database().ref("Address");
        const user = firebase.auth().currentUser.email;

        const data = {
            DoorNo,
            Apartment,
            City,
            Street,
            State,
            Pin,
            user,
        };

        dataRef.push(data);
        setOpen(false);
    };

    return (
        <div className={classes.h}>
            <p className={classes.head}>Address</p>
            <Address_List />
            <Button className={classes.sbutton} onClick={handleClickOpen}>
                Add Address
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Address</DialogTitle>
                <DialogActions>
                    <TextField 
                        margin = "dense"
                        autofocus
                        type="text"
                        fullWidth
                        required
                        value={DoorNo}
                        label ="Door No."
                        onChange={(event) => SetDoorNo(event.target.value)}
                    />
                </DialogActions>
                <DialogActions>
                    <TextField 
                        type="text"
                        required
                        autofocus
                        value={Apartment}
                        onChange={(event) => SetApartment(event.target.value)}
                        label="Apartment Name"
                        fullWidth
                        margin = "dense"
                    />
                </DialogActions>
                <DialogActions>
                    <TextField 
                        type="text"
                        required
                        autofocus
                        value={Street}
                        label="Street"
                        onChange={(event) => SetStreet(event.target.value)}
                        fullWidth
                        margin = "dense"
                    />
                </DialogActions>
                <DialogActions>
                    <TextField 
                        type="text"
                        required
                        autofocus
                        value={City}
                        label = "City"
                        onChange={(event) => SetCity(event.target.value)}
                        fullWidth
                        margin = "dense"
                    />
                </DialogActions>
                <DialogActions>
                    <TextField 
                        type="text"
                        required
                        autofocus
                        value={State}
                        label = "State"
                        onChange={(event) => SetState(event.target.value)}
                        fullWidth
                        margin = "dense"
                    />
                </DialogActions>
                <DialogActions>
                    <TextField
                        type="Number"
                        autofocus
                        required
                        value={Pin}
                        label = "Pincode"
                        onChange={(event) => SetPin(event.target.value)}
                        fullWidth
                        margin = "dense"
                    />
                </DialogActions>
                <DialogActions>
                        <Button onClick={handleClose} className={classes.sbutton} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleData} className={classes.sbutton} color="primary">
                            Add
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Address;
