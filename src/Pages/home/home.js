import {useState} from 'react';
import { Search } from '@material-ui/icons';

import AllItem from "./Allitem";
import Leftlayout from "./leftlayout";
import classes from './home.module.css';
import Fruit from './Allitem/Fruit';
import Laptop from './Allitem/Laptop';
import Vegetables from './Allitem/Vegetabls';
import Phone from './Allitem/Smartphone';
import SearchCat from "../../Components/Search/SearchCat";
import firebase from '../../firebase/firebase';

const Home = () => {

    const [openAll,setOpenAll] = useState(true);
    const [openFruit,setOpenFruit] =   useState(false);
    const [openVeg,setOpenVeg] =       useState(false);
    const [openLaptop,setOpenLaptop] = useState(false);
    const [openPhone,setOpenPhone] = useState(false);
    const [Text, setText] = useState("");
    const [List,setList] = useState();

    const HandleSearch = () => {
        const ref = firebase.database().ref("Product/");
        ref
            .orderByChild("Pname")
            .startAt(Text)
            .endAt(Text + "\uf8ff")
            .once("value")
            .then((snap) => {
                const t = snap.val();
                const list = [];
                for(let id in t){
                    list.push({id,...t[id]});
                }
                setList(list);
            })
            console.log(List);
            setOpenPhone(false);
        setOpenLaptop(false);
        setOpenAll(false);
        setOpenFruit(false);
        setOpenVeg(false);
    }

    function handleOpenAll() {
        setOpenAll(true);
        setOpenFruit(false);
        setOpenVeg(false);
        setOpenLaptop(false);
        setOpenPhone(false);
        setList("");
    }

    function handleOpenFruit() {
        setOpenFruit(true);
        setOpenAll(false);
        setOpenVeg(false);
        setOpenLaptop(false);
        setOpenPhone(false);
        setList("");
    }

    function handleOpenVeg() {
        setOpenVeg(true);
        setOpenAll(false);
        setOpenFruit(false);
        setOpenLaptop(false);
        setOpenPhone(false);
        setList("");
    }

    function handleOpenLap() {
        setOpenLaptop(true);
        setOpenAll(false);
        setOpenFruit(false);
        setOpenVeg(false);
        setOpenPhone(false);
        setList("");
    }

    function handleOpenPhone() {
        setOpenPhone(true);
        setOpenLaptop(false);
        setOpenAll(false);
        setOpenFruit(false);
        setOpenVeg(false);
        setList("");
    }

 
    return (
        <section>
            <div className={classes.action}>
                <input type = 'text'
                required
                autoFocus
                className = {classes.input}
                value={Text}
                onChange = {(e)=>setText(e.target.value)}
                placeholder="Search Category"/>
                <button className={classes.Searchbtn} onClick={HandleSearch}><Search className={classes.Search} /></button>
                Category : 
                <button className={classes.All} onClick={handleOpenAll}>All</button>
                <button className={classes.Fruit} onClick={handleOpenFruit}>Fruit</button>
                <button className={classes.Veg} onClick={handleOpenVeg}>Vegetables</button>
                <button className={classes.Smartphone} onClick={handleOpenPhone}>SmartPhone</button>
                <button className={classes.Laptop} onClick={handleOpenLap}>Laptop</button>
            </div>
        
        <div className={classes.right}>
            {List ? List.map((a, index)=> <SearchCat item = {a} key = {index}  /> ): ""}
            {openAll ? <AllItem /> : ""}
            {openFruit ?  <Fruit /> : ""}
            {openVeg ?  <Vegetables /> : ""}
            {openLaptop ?  <Laptop /> : ""}
            {openPhone ?  <Phone /> : ""}
        </div>
        </section>
    );
}

export default Home;