import { Model, DataTypes, Sequelize, BelongsToManyGetAssociationsMixin, BelongsToManyCountAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManySetAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin } from 'sequelize';
import sequelize from '../config/database';
import Book from './Book';

// DONE: Implement the Category model
class Category extends Model{
  public id!: number;
  public name!: string;
  public description!: string;

  // Add methods from Category.belongsToMany(Book) association
  declare getBooks: BelongsToManyGetAssociationsMixin<Book>;
  declare countBooks: BelongsToManyCountAssociationsMixin;
  declare hasBook: BelongsToManyHasAssociationMixin<Book, number>;
  declare hasBooks: BelongsToManyHasAssociationsMixin<Book, number>;
  declare setBooks: BelongsToManySetAssociationsMixin<Book, number>;
  declare addBook: BelongsToManyAddAssociationMixin<Book, number>;
  declare addBooks: BelongsToManyAddAssociationsMixin<Book, number>;
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
    type: DataTypes.STRING
  }
},
{
  sequelize: sequelize,
  modelName: "Category"
}
);

// DONE: define relationships
// -> done in relationships.ts

export default Category;
