import { Request, Response } from 'express';
import Book from '../models/Book';
// TODO: Import related models
// import Author from '../models/Author';
// import Category from '../models/Category';

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    await Book.sync();
    
    // TODO: Include related models when fetching books
    // const books = await Book.findAll({
    //   include: [
    //     { model: Author, as: 'author' },
    //     { model: Category, as: 'categories' }
    //   ]
    // });
    
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
    // const authors = await Author.findAll();
    // const categories = await Category.findAll();
    
    res.render('books/new', { 
      title: 'Add New Book',
      // authors: authors.map(author => author.get({ plain: true })),
      // categories: categories.map(category => category.get({ plain: true }))
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
    // const book = await Book.findByPk(req.params.id, {
    //   include: [
    //     { model: Author, as: 'author' },
    //     { model: Category, as: 'categories' }
    //   ]
    // });
    
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
    // const book = await Book.findByPk(req.params.id, {
    //   include: [
    //     { model: Author, as: 'author' },
    //     { model: Category, as: 'categories' }
    //   ]
    // });
    
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).render('error', { error: 'Book not found' });
    
    // TODO: Get all authors and categories for form dropdowns
    // const authors = await Author.findAll();
    // const categories = await Category.findAll();
    
    // Get the selected category IDs for the book
    // const selectedCategoryIds = plainBook.categories.map(cat => cat.id);
    
    const plainBook = book.get({ plain: true });
    res.render('books/edit', { 
      book: plainBook, 
      title: `Edit ${plainBook.title}`,
      // authors: authors.map(author => author.get({ plain: true })),
      // categories: categories.map(category => category.get({ plain: true })),
      // selectedCategoryIds
    });
  } catch (error) {
    console.error('Error in editBookForm:', error);
    res.status(500).render('error', { error: 'Error fetching book' });
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    // TODO: Handle authorId instead of author field
    // const { title, authorId, isbn, publishedYear, description, categoryIds } = req.body;
    const { title, author, isbn, publishedYear, description } = req.body;
    
    if (!title || !author || !isbn || !publishedYear) {
      // TODO: Get authors and categories for dropdown menus if validation fails
      // const authors = await Author.findAll();
      // const categories = await Category.findAll();
      
      return res.status(400).render('books/new', {
        error: 'Please fill in all required fields',
        book: req.body,
        title: 'Add New Book',
        // authors: authors.map(author => author.get({ plain: true })),
        // categories: categories.map(category => category.get({ plain: true }))
      });
    }

    const existingBook = await Book.findOne({ where: { isbn } });
    if (existingBook) {
      // TODO: Get authors and categories for dropdown menus if validation fails
      // const authors = await Author.findAll();
      // const categories = await Category.findAll();
      
      return res.status(400).render('books/new', {
        error: 'A book with this ISBN already exists. ISBN must be unique.',
        book: req.body,
        title: 'Add New Book',
        // authors: authors.map(author => author.get({ plain: true })),
        // categories: categories.map(category => category.get({ plain: true }))
      });
    }

    // TODO: Create book with authorId instead of author field
    // const book = await Book.create({
    //   title,
    //   authorId: parseInt(authorId, 10),
    //   isbn,
    //   publishedYear: parseInt(publishedYear, 10),
    //   description: description || ''
    // });
    
    const book = await Book.create({
      title,
      author,
      isbn,
      publishedYear: parseInt(publishedYear, 10),
      description: description || ''
    });
    
    // TODO: Handle many-to-many relationship with categories
    // if (categoryIds) {
    //   // Handle both single category or multiple categories
    //   const categoryIdArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
    //   await book.setCategories(categoryIdArray.map(id => parseInt(id, 10)));
    // }
    
    return res.redirect('/books');
  } catch (error) {
    console.error('Error in createBook:', error);
    
    // TODO: Get authors and categories for dropdown menus if there's an error
    // const authors = await Author.findAll();
    // const categories = await Category.findAll();
    
    let errorMessage = 'Error creating book. Please check your input.';
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      errorMessage = 'A book with this ISBN already exists. ISBN must be unique.';
    }
    
    return res.status(400).render('books/new', {
      error: errorMessage,
      book: req.body,
      title: 'Add New Book',
      // authors: authors.map(author => author.get({ plain: true })),
      // categories: categories.map(category => category.get({ plain: true }))
    });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).render('error', { error: 'Book not found' });
    
    // TODO: Handle authorId instead of author field
    // const { title, authorId, isbn, publishedYear, description, categoryIds } = req.body;
    const { title, author, isbn, publishedYear, description } = req.body;
    
    // TODO: Update book with authorId instead of author field
    // await book.update({
    //   title,
    //   authorId: parseInt(authorId, 10),
    //   isbn,
    //   publishedYear: parseInt(publishedYear, 10),
    //   description: description || ''
    // });
    
    await book.update({
      title,
      author,
      isbn,
      publishedYear: parseInt(publishedYear, 10),
      description: description || ''
    });
    
    // TODO: Handle many-to-many relationship with categories
    // if (categoryIds) {
    //   // Handle both single category or multiple categories
    //   const categoryIdArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
    //   await book.setCategories(categoryIdArray.map(id => parseInt(id, 10)));
    // } else {
    //   // If no categories selected, remove all associations
    //   await book.setCategories([]);
    // }
    
    return res.redirect('/books');
  } catch (error) {
    console.error('Error in updateBook:', error);
    
    // TODO: Get all authors and categories for form dropdowns if there's an error
    // const authors = await Author.findAll();
    // const categories = await Category.findAll();
    
    return res.status(400).render('books/edit', { 
      error: 'Error updating book. Please check your input.',
      book: { ...req.body, id: req.params.id },
      title: 'Edit Book',
      // authors: authors.map(author => author.get({ plain: true })),
      // categories: categories.map(category => category.get({ plain: true })),
      // selectedCategoryIds: Array.isArray(req.body.categoryIds) ? req.body.categoryIds : [req.body.categoryIds]
    });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).render('error', { error: 'Book not found' });
    
    // TODO: Before deleting, remove associations with categories
    // await book.setCategories([]);
    
    await book.destroy();
    return res.redirect('/books');
  } catch (error) {
    console.error('Error in deleteBook:', error);
    return res.status(500).render('error', { error: 'Error deleting book' });
  }
}; 