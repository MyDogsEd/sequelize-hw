import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Book from './Book';

// TODO: Create the Category interface
interface CategoryAttributes {
  id?: number;
  name: string;
  description?: string;
  // Add any additional attributes here
}

// TODO: Implement the Category model
class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  
  // TODO: Add association methods for many-to-many relationship
  // public getBooks!: BelongsToManyGetAssociationsMixin<Book>;
  // public setBooks!: BelongsToManySetAssociationsMixin<Book, number>;
  // public addBook!: BelongsToManyAddAssociationMixin<Book, number>;
  // public addBooks!: BelongsToManyAddAssociationsMixin<Book, number>;
  // public createBook!: BelongsToManyCreateAssociationMixin<Book>;
  // public removeBook!: BelongsToManyRemoveAssociationMixin<Book, number>;
  // public removeBooks!: BelongsToManyRemoveAssociationsMixin<Book, number>;
  // public hasBook!: BelongsToManyHasAssociationMixin<Book, number>;
  // public hasBooks!: BelongsToManyHasAssociationsMixin<Book, number>;
  // public countBooks!: BelongsToManyCountAssociationsMixin;
}

// TODO: Initialize the Category model
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Add additional fields as needed
  },
  {
    sequelize,
    modelName: 'Category',
  }
);

// TODO: Define the BookCategory join model for many-to-many relationship
// const BookCategory = sequelize.define('BookCategory', {}, { timestamps: true });

// TODO: Set up many-to-many relationship
// Category.belongsToMany(Book, {
//   through: BookCategory,
//   as: 'books',
//   foreignKey: 'categoryId',
//   otherKey: 'bookId'
// });

export default Category; 