import React,{useState} from "react";
import Dialog from '@material-ui/core/Dialog';
import Delete from '@material-ui/icons/Delete';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import firebase from '../../firebase/firebase';
import classes from "./Profile.module.css";


export const AddressItem = ({ address }) => {


    const [open,setOpen] = useState(false);

    const deleteAddress = () => {
        const addRef = firebase.database().ref('Address').child(address.id);
        addRef.remove();
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
      };
    
    const handleClickOpen = () => {
        setOpen(true);
      };

  return (
    <div>
      <table className={classes.table}>
        <tr>
          <td className={classes.tdp}>
            <p>
                {address.DoorNo},{address.Apartment},{address.Street},{address.City},
                {address.State},PinCode - {address.Pin}
            </p>
          </td>
          <td className={classes.tdb}>
              <button className={classes.delete} onClick={handleClickOpen}><Delete /></button>
          </td>
        </tr>
      </table>
      <Dialog 
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
           <DialogTitle id="alert-dialog-title">{"Do you want to delete this address?"}</DialogTitle>
            <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAddress} color="primary" autoFocus>
            Confirm
          </Button>
          </DialogActions>
      </Dialog>
    </div>
  );
};
