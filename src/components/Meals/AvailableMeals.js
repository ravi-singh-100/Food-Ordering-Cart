import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Samosa',
    description: 'Crisp covering with mashed potato inside',
    price: 20.00,
  },
  {
    id: 'm2',
    name: 'Pav Bhaji',
    description: 'Mashed veggies with buttery buns',
    price: 80.00,
  },
  {
    id: 'm3',
    name: 'Burger',
    description: 'American, raw, meaty',
    price: 60.00,
  },
  {
    id: 'm4',
    name: 'Salad Bowl',
    description: 'Healthy...and green...',
    price: 100.00,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
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