import { Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, CreationOptional, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin } from 'sequelize';
import sequelize from '../config/database';
import Book from './Book';


// DONE: Implement the Author model
class Author extends Model {
    declare id: CreationOptional<number>;
    declare name: string;
    declare bio: string;
    declare birthYear: number

    // Declare methods added by Author.hasMany(Book)
    // I love strongly typed languages, can you tell?
    declare getBooks: HasManyGetAssociationsMixin<Book>;
    declare addBook: HasManyAddAssociationMixin<Book, number>;
    declare addBooks: HasManyAddAssociationsMixin<Book, number>;
    declare removeBook: HasManyRemoveAssociationMixin<Book, number>;
    declare removeBooks: HasManyRemoveAssociationsMixin<Book, number>;
    declare hasBook: HasManyHasAssociationMixin<Book, number>;
    declare hasBooks: HasManyHasAssociationsMixin<Book, number>;
    declare countBooks: HasManyCountAssociationsMixin;
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
        type: DataTypes.STRING
    },
    birthYear: {
        type: DataTypes.NUMBER
    }
}, {
    sequelize: sequelize,
    modelName: "Author"
});

// DONE: Define associations
// -> done in relationships.ts

export default Author;
