import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Book from './Book';
import { allowedNodeEnvironmentFlags } from 'process';


// DONE: Implement the Category model
class Category extends Model{
  public id!: number;
  public name!: string;
  public description!: string;
}

// DONE: Initialize the Category model
Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize: sequelize,
  modelName: "Category"
}
);

// DONE: define relationships
//Category.belongsToMany(Book, {through: "BookCategories"})

export default Category;
