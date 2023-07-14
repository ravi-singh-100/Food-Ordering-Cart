import { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/Cart-Context';
import classes from './Cart.module.css'
import CartItem from './CartItem';
const Cart=(props)=>{
    const cartCtx= useContext(CartContext);
    const hasItems=cartCtx.items.length
    const totalAmount=`Rs${cartCtx.totalAmount.toFixed(2)}`;
   const cartItemRemoveHandler=(id)=>{
cartCtx.removeItem(id);
   }
   const cartItemAddHandler=(item)=>{
cartCtx.addItem({...item,amount:1})
   }
    const cartItems=<ul className={classes['cart-items']}>{cartCtx.items.map((item)=><li>
<CartItem key={item.id}  name={item.name} price={item.price} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)} />
    </li>)}
    </ul>
    return (
       <Modal onClose={props.onClose}>
          {cartItems}
            <div className={classes.total}>
                <span>
                    Total Amount
                </span>
                <span>
                   {totalAmount}
                </span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}> Close</button>
               {hasItems>0&& <button className={classes.button}>Order</button>}
            </div>
        </Modal>

    )
}
export default Cart;