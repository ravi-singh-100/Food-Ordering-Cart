import { useEffect,useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Samosa',
//     description: 'Crisp covering with mashed potato inside',
//     price: 20.00,
//   },
//   {
//     id: 'm2',
//     name: 'Pav Bhaji',
//     description: 'Mashed veggies with buttery buns',
//     price: 80.00,
//   },
//   {
//     id: 'm3',
//     name: 'Burger',
//     description: 'American, raw, meaty',
//     price: 60.00,
//   },
//   {
//     id: 'm4',
//     name: 'Salad Bowl',
//     description: 'Healthy...and green...',
//     price: 100.00,
//   },
// ];


const AvailableMeals = () => {
  const [meals,setMeals]=useState([])
  const [loading,setLoading]=useState(true);
  const[error,setError]=useState();
 
    useEffect(()=>{
      const fetchMeals=async()=>{
        const response=await fetch('https://food-ordering-app-f2b58-default-rtdb.firebaseio.com/meals.json');
        if(!response.ok){
          throw new Error('Something went wrong')
        }
        const data=await response.json();
     
    
      const DUMMY_MEALS=[]
      for(const key in data){
        DUMMY_MEALS.push({
          id:key,
          name:data[key].name,
          description:data[key].description,
          price:data[key].price
                  })
      }
      setMeals(DUMMY_MEALS)
      setLoading(false);
    }
   
        fetchMeals().catch((error)=>{
          setLoading(false);
          setError(error.message)
        });


    },[])
    
  
  if(loading){
    return <section className={classes.MealsLoading}>
<p>Loading....</p>
    </section>
  }
  if(error){
    return( <section className={classes.MealsError}>
      <p>{error}</p>
    </section> )
   
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
       
   <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

