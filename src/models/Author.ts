import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';


// DONE: Implement the Author model
class Author extends Model {
    public id!: number;
    public name!: string;
    public bio!: string;
}

// DONE: Initialize the Author model
Author.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    }, 
    bio: {
        type: DataTypes.STRING,
    }
}, {
    sequelize: sequelize,
    modelName:"Author"
});

// DONE: Define associations
// -> done in relationships.ts

export default Author;
