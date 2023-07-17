import { useContext ,useEffect,useState} from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/Cart-Context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted,setBtnIsHighlighted]=useState(false);
  const {items}=cartCtx;
  useEffect(()=>{
    if(items.length===0){return;}
    setBtnIsHighlighted(true);
    const timer=setTimeout(()=>{setBtnIsHighlighted(false);},300)
  return ()=>{
    clearTimeout(timer)
  }  
  },[items])
  

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
const btnClasses=`${classes.button} ${btnIsHighlighted?classes.bump:''}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;