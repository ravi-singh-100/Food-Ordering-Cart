import React ,{ useContext,useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/Cart-Context';
import classes from './Cart.module.css'
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart=(props)=>{
    const[isSubmitting,setIsubmitting]=useState(false)
    const[didSubmit,setDidSubmit]=useState(false);
    const[isCheckout,setIsCheckout]=useState(false);
    const cartCtx= useContext(CartContext);
    const hasItems=cartCtx.items.length
    const totalAmount=`Rs${cartCtx.totalAmount.toFixed(2)}`;
   const cartItemRemoveHandler=(id)=>{
cartCtx.removeItem(id);
   }
   const cartItemAddHandler=(item)=>{
cartCtx.addItem({...item,amount:1})
   }
const orderHandler=()=>{
setIsCheckout(true);
}
const submitOrderHandler= async (userData)=>{
    setIsubmitting(true)
await fetch('https://food-ordering-app-f2b58-default-rtdb.firebaseio.com/orders.json',{
method:'POST',
body:JSON.stringify({
    user:userData,
    orderedItems:cartCtx.items
})
 })
 setIsubmitting(false);
 setDidSubmit(true);
 cartCtx.clearCart();
}
const modalAction= ( <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}> Close</button>
   {hasItems>0&& <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>)
    const cartItems=<ul className={classes['cart-items']}>{cartCtx.items.map((item)=><li>
<CartItem key={item.id}  name={item.name} price={item.price} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)} />
    </li>)}
    </ul>
  const cartModalContent=(<React.Fragment>
     {cartItems}
            <div className={classes.total}>
                <span>
                    Total Amount
                </span>
                <span>
                   {totalAmount}
                </span>
            </div>
            {isCheckout&&<Checkout onCheckOut={submitOrderHandler}onCancel={props.onClose}/>}
            {!isCheckout&&modalAction}
    </React.Fragment>
  )
  const isSubmittingModalContent=<p>Sending Order Data...</p>
  const didSubmitModalContent=<React.Fragment>
    <p>Successfully Sent the order...</p>
    <div className={classes.actions}>
    <button className={classes.button} onClick={props.onClose}> Close</button>
    </div>
    </React.Fragment>
    return (
       <Modal onClose={props.onClose}>
     {!isSubmitting &&!didSubmit&&cartModalContent}
         {isSubmitting&&isSubmittingModalContent} 
         {didSubmit&&!isSubmitting&&didSubmitModalContent}
        </Modal>

    )
}
export default Cart;