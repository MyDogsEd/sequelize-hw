import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Book from './Book';


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
        allowNull: false
    }, 
    bio: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelize,
    modelName:"Author"
});

// DONE: Define associations
//Author.hasMany(Book)

export default Author;
