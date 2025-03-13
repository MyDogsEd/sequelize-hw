import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
// TODO: Import related models
// import Author from './Author';
// import Category from './Category';

interface BookAttributes {
  id?: number;
  title: string;
  author: string; // TODO: Remove this field once Author model is implemented
  isbn: string;
  publishedYear: number;
  description?: string;
  // TODO: Add foreign key for Author
  // authorId?: number;
}

class Book extends Model<BookAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public author!: string; // TODO: Remove this field once Author model is implemented
  public isbn!: string;
  public publishedYear!: number;
  public description!: string;
  // TODO: Add foreign key property
  // public authorId!: number;
  
  // TODO: Add association methods
  // public getAuthor!: BelongsToGetAssociationMixin<Author>;
  // public setAuthor!: BelongsToSetAssociationMixin<Author, number>;
  
  // TODO: Add Category association methods
  // public getCategories!: BelongsToManyGetAssociationsMixin<Category>;
  // public setCategories!: BelongsToManySetAssociationsMixin<Category, number>;
  // public addCategory!: BelongsToManyAddAssociationMixin<Category, number>;
  // public addCategories!: BelongsToManyAddAssociationsMixin<Category, number>;
  // public removeCategory!: BelongsToManyRemoveAssociationMixin<Category, number>;
  // public removeCategories!: BelongsToManyRemoveAssociationsMixin<Category, number>;
  // public hasCategory!: BelongsToManyHasAssociationMixin<Category, number>;
  // public hasCategories!: BelongsToManyHasAssociationsMixin<Category, number>;
  // public countCategories!: BelongsToManyCountAssociationsMixin;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: { // TODO: Remove this field once Author model is implemented
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // TODO: Add foreign key for Author relationship
    // authorId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Authors',
    //     key: 'id'
    //   }
    // },
  },
  {
    sequelize,
    modelName: 'Book',
  }
);

// TODO: Define Book -> Author association (belongs to)
// Book.belongsTo(Author, {
//   foreignKey: 'authorId',
//   as: 'author'
// });

// TODO: Define Book -> Category association (many-to-many)
// Book.belongsToMany(Category, {
//   through: 'BookCategory',
//   as: 'categories',
//   foreignKey: 'bookId',
//   otherKey: 'categoryId'
// });

export default Book; 