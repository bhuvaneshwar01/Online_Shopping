import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Home from '../../Pages/home/home';
import Profile from '../../Pages/My_profile/Profile';
import Cart_list from "../../Pages/Cart/Cart-list";
import WishList from '../../Pages/WishList/WishList_List';
import Order from '../../Pages/Order/Order';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import fire from "../../firebase/firebase";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlelogout = () => {
    fire.auth().signOut();
  }   
  
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="My WishList" {...a11yProps(1)} />
          <Tab label="MY Cart" {...a11yProps(2)} />
          <Tab label="MY ORDER" {...a11yProps(3)} />
          <Tab label="MY PROFILE" {...a11yProps(4)} />
          <Tab label="LOG OUT" {...a11yProps(5)} onClick={handleClickOpen} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WishList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Cart_list />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Order />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{" Log out"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
               Are You Sure??
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handlelogout} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </TabPanel>
    </div>
  );
}
