import { Model, DataTypes, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyCountAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin } from 'sequelize';
import sequelize from '../config/database';
import Author from './Author';
import Category from './Category';

class Book extends Model {
  public id!: number;
  public title!: string;
  public isbn!: string;
  public publishedYear!: number;
  public description!: string;

  // Associations from Book.belongsTo(Author)
  declare getAuthor: BelongsToGetAssociationMixin<Author>;
  declare setAuthor: BelongsToSetAssociationMixin<Author, number>;

  // Associations from Book.belongsToMany(Category)
  declare getCategories: BelongsToManyGetAssociationsMixin<Category>;
  declare countCategories: BelongsToManyCountAssociationsMixin;
  declare hasCategory: BelongsToManyHasAssociationMixin<Category, number>;
  declare hasCategories: BelongsToManyHasAssociationsMixin<Category, number>;
  declare addCategory: BelongsToManyAddAssociationMixin<Category, number>;
  declare addCategories: BelongsToManyAddAssociationsMixin<Category, number>;
  declare removeCategory: BelongsToManyRemoveAssociationMixin<Category, number>;
  declare removeCategories: BelongsToManyRemoveAssociationsMixin<Category, number>;
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
    },/*
    for some reason the database won't load if this is not commented
    authorId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Authors',
        key: 'id'
      }
    }, */
  },
  {
    sequelize,
    modelName: 'Book',
  }
);

// DONE: Define Book -> Author association (belongs to)
// DONE: Define Book -> Category association (many-to-many)
// -> done in relationships.ts


export default Book;
