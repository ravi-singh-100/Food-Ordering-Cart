import {useRef,useState} from 'react';
import classses from './MealItemForm.module.css';
import Input from '../../UI/Input';
const MealItemForm=(props)=>{
    const [amountIsValid,setAmountIsValid]=useState(true);
const amountInputRef=useRef();
    const submitHandler=(event)=>{
event.preventDefault();
const amountEntered=amountInputRef.current.value;
const enteredAmountNumber=+amountEntered;
if(enteredAmountNumber<1||amountEntered.trim().length===0){
    setAmountIsValid(false);
    return;
}
else{
    setAmountIsValid(true);
}
props.onAddToCart(enteredAmountNumber);
    }
return (
    <form className={classses.form} onSubmit={submitHandler}>
<Input
ref={amountInputRef}
 label='Amount'
  input={{
    id:'Amount',
    type:'number',
  min:'0',
step:'1',
defaultValue:'0'
}}/>
<button>+ Add</button>
{!amountIsValid &&<p>Please enter a valid amount</p>}
    </form>
)
}
export default MealItemForm;