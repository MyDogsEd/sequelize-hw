import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Book from './Book';

// TODO: Create the Author interface to define the structure
interface AuthorAttributes {
  id?: number;
  name: string;
  bio?: string;
  birthYear?: number;
  // Add any additional attributes here
}

// TODO: Implement the Author model
class Author extends Model<AuthorAttributes> implements AuthorAttributes {
  public id!: number;
  public name!: string;
  public bio!: string;
  public birthYear!: number;
  
  // TODO: Add association methods
  // public getBooks!: HasManyGetAssociationsMixin<Book>;
  // public addBook!: HasManyAddAssociationMixin<Book, number>;
  // public hasBook!: HasManyHasAssociationMixin<Book, number>;
  // public countBooks!: HasManyCountAssociationsMixin;
  // public createBook!: HasManyCreateAssociationMixin<Book>;
}

// TODO: Initialize the Author model
Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    birthYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Add additional fields as needed
  },
  {
    sequelize,
    modelName: 'Author',
  }
);

// TODO: Define associations
// Author.hasMany(Book, {
//   sourceKey: 'id',
//   foreignKey: 'authorId',
//   as: 'books'
// });

export default Author; 