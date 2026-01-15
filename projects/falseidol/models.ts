import Drink from './drinks/drinks.model'
import UserDrink from './drinks/user.drink.model'
import Image from './images/images.model'
import Log from './logs/logs.model'
import Setting from './settings/settings.model'
import User from './users/users.model'

Drink.hasOne(UserDrink, {
    foreignKey: 'drinkId',
    sourceKey: 'drinkId',
    as: 'userInfo'
});
       
export default {
    Drink, 
    UserDrink,
    Image,
    Log,
    Setting,
    User
}