import classes from "./card.module.css";

function card(props){
    return <div  className={classes.Card}>{props.children}</div>;
}

export default card;