import Drink from '../drinks/drinks.model'
import UserDrink from '../drinks/user.drink.model'
import Image from '../images/images.model'
import Log from '../logs/logs.model'
import Setting from '../settings/settings.model'
import User from '../users/users.model'

Drink.belongsToMany(UserDrink, {
    through: UserDrink,
    foreignKey: 'drinkId',
    otherKey: 'userDrinkId',
    as: 'userInfo'
});

User.belongsToMany(UserDrink, {
    through: UserDrink,
    foreignKey: 'userDrinkId',
    otherKey: 'drinkId',
    as: 'drinkInfo'
});

UserDrink.hasMany(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Drink.hasMany(UserDrink, {
    foreignKey: 'drinkId',
    onDelete: 'CASCADE'
});

export {
    Drink,
    UserDrink,
    Image,
    Log,
    Setting,
    User
}