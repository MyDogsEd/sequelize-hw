import { Request, Response } from 'express';
import Book from '../models/Book';
import Author from '../models/Author';
import Category from '../models/Category';
// TODO: Import related models
// import Author 
// import Category 
/*


ALL TODO'S IN THIS ARE OPTIONAL, YOU ONLY NEED TO DO THESE IF YOU WANT THE AUTHORS AND CATEGORIES TO SHOW UP IN THE FORMS AND RETURN DATA
AGAIN THIS FILE IS OPTIONAL. YOU CAN MAKE API ENDPOINTS IN THE OTHER CONTROLLERS TO TEST YOUR NEW MODELS

*/
// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    
    // TODO: Include related models when fetching books
    
    const books = await Book.findAll();
    const plainBooks = books.map(book => book.get({ plain: true }));
    
    res.render('books/index', { books: plainBooks, title: 'All Books' });
  } catch (error) {
    console.error('Error in getAllBooks:', error);
    res.status(500).render('error', { error: 'Error fetching books' });
  }
};

// Show new book form
export const newBookForm = async (req: Request, res: Response) => {
  try {
    // TODO: Get authors and categories for dropdown menus
    const authors = await Author.findAll();
    const categories = await Category.findAll()

    const plainAuthors = authors.map((a: Author) => a.get({plain: true}));
    const plainCategories = categories.map((c: Category) => c.get({plain: true}));
    
    res.render('books/new', { 
      title: 'Add New Book',
      //TODO send back a authors and categories for the form
      authors: plainAuthors,
      categories: plainCategories
    });
  } catch (error) {
    console.error('Error in newBookForm:', error);
    res.status(500).render('error', { error: 'Error loading form' });
  }
};

// Get a single book
export const getBook = async (req: Request, res: Response) => {
  try {
    // TODO: Include related models when fetching a single book
    
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).render('error', { error: 'Book not found' });
    
    const plainBook = book.get({ plain: true });
    res.render('books/show', { book: plainBook, title: plainBook.title });
  } catch (error) {
    console.error('Error in getBook:', error);
    res.status(500).render('error', { error: 'Error fetching book' });
  }
};

// Show edit book form
export const editBookForm = async (req: Request, res: Response) => {
  try {
    // TODO: Get the book with its related models
    
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).render('error', { error: 'Book not found' });
    
    // DONE: Get all authors and categories for form dropdowns
    const authors = await Author.findAll({plain: true});
    const categories = await Category.findAll({plain: true});
    
    // Get the selected category IDs for the book
    
    const plainBook = book.get({ plain: true });
    res.render('books/edit', { 
      book: plainBook, 
      authors: authors,
      categories: categories,
      title: `Edit ${plainBook.title}`,
      //DONE send back authors and categories
    });
  } catch (error) {
    console.error('Error in editBookForm:', error);
    res.status(500).render('error', { error: 'Error fetching book' });
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    // DONE: Handle authorId instead of author field
    const { title, authorId, isbn, publishedYear, description, categoryIds } = req.body;
    
    if (!title || !authorId || !isbn || !publishedYear) {
      // DONE: Get authors and categories for dropdown menus if validation fails
      return res.status(400).render('books/new', {
        error: 'Please fill in all required fields',
        book: req.body,
        title: 'Add New Book',
        authors: (await Author.findAll()).map((a: Author) => a.get({plain: true})),
        categories: (await Category.findAll()).map((c: Category) => c.get({plain: true}))
      });
    }

    const existingBook = await Book.findOne({ where: { isbn } });
    if (existingBook) {
      // DONE: Get authors and categories for dropdown menus if validation fails
      return res.status(400).render('books/new', {
        error: 'A book with this ISBN already exists. ISBN must be unique.',
        book: req.body,
        title: 'Add New Book',
        authors: (await Author.findAll()).map((a: Author) => a.get({plain: true})),
        categories: (await Category.findAll()).map((c: Category) => c.get({plain: true}))
      });
    }

    // DONE: Create book with authorId instead of author field
    const book = await Book.create({
      title,
      isbn,
      publishedYear: parseInt(publishedYear, 10),
      description: description || ''
    });

    // Find the author 
    const author = await Author.findByPk(authorId);

    // if author not found
    if(!author) {
      return res.status(400).render('books/new', {
        error: 'A book must have an author.',
        book: req.body,
        title: 'Add New Book',
        authors: (await Author.findAll()).map((a: Author) => a.get({plain: true})),
        categories: (await Category.findAll()).map((c: Category) => c.get({plain: true}))
      });
    }

    // add author
    book.setAuthor(author);

    // DONE: Handle many-to-many relationship with categories
    // Get all selected categories
    const categories = await Category.findAll({
      where: {
        id: { in: categoryIds }
    }});

    // add all categories to book
    book.addCategories(categories);

    // for each category, add this book to it
    categories.forEach((c: Category) => c.addBook(book))

    // Redirect to books page
    return res.redirect('/books');
  } 
  
  catch (error) {
    console.error('Error in createBook:', error);
    
    // DONE: Get authors and categories for dropdown menus if there's an error
    
    let errorMessage = 'Error creating book. Please check your input.';
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      errorMessage = 'A book with this ISBN already exists. ISBN must be unique.';
    }
    
    return res.status(400).render('books/new', {
      error: errorMessage,
      book: req.body,
      title: 'Add New Book',
      authors: (await Author.findAll()).map((a: Author) => a.get({plain: true})),
      categories: (await Category.findAll()).map((c: Category) => c.get({plain: true}))
    });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).render('error', { error: 'Book not found' });
    
    // DONE: Handle authorId instead of author field
    const { title, authorId, isbn, publishedYear, description, categoryIds } = req.body;
    
    // DONE: Update book with authorId instead of author field
    
    await book.update({
      title,
      isbn,
      publishedYear: parseInt(publishedYear, 10),
      description: description || ''
    });

    book.setAuthor(authorId)

    // DONE: Handle many-to-many relationship with categories
    // Get all selected categories
    const categories = await Category.findAll({
      where: {
        id: { in: categoryIds }
    }});

    // remove this book from all categories it belongs to
    (await book.getCategories()).forEach((c: Category) => c.removeBook(book));

    // remove all categories from this book
    book.removeCategories(await Category.findAll());

    // add new categories
    book.addCategories(categories);
    categories.forEach((c: Category) => c.addBook(book))

    // redirect to books page
    return res.redirect('/books');
  } 
  
  catch (error) {
    console.error('Error in updateBook:', error);
    
    // DONE: Get all authors and categories for form dropdowns if there's an error
    return res.status(400).render('books/edit', { 
      error: 'Error updating book. Please check your input.',
      book: { ...req.body, id: req.params.id },
      title: 'Edit Book',
      authors: (await Author.findAll()).map((a: Author) => a.get({plain: true})),
      categories: (await Category.findAll()).map((c: Category) => c.get({plain: true}))
    });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).render('error', { error: 'Book not found' });
    
    // DONE: Before deleting, remove associations with categories (and author)
    (await book.getCategories()).forEach((c: Category) => c.removeBook(book));
    (await book.getAuthor()).removeBook(book);

    
    await book.destroy();
    return res.redirect('/books');
  } catch (error) {
    console.error('Error in deleteBook:', error);
    return res.status(500).render('error', { error: 'Error deleting book' });
  }
}; 