import Author from "../models/Author";
import Book from "../models/Book";
import Category from "../models/Category";

const createAssociations = function () {
  // Author/Book
  Author.hasMany(Book);
  Book.belongsTo(Author);

  // Book/Category
  Category.belongsToMany(Book, { through: "BookCategories" });
  Book.belongsToMany(Category, { through: "BookCategories" });
};

export default createAssociations;