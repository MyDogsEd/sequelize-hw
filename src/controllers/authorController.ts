import { Request, Response } from 'express';
import Author from '../models/Author';
// TODO: Import Book model
// import Book from '../models/Book';

// TODO: Implement get all authors
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    // TODO: Get all authors with their book counts
    // const authors = await Author.findAll({
    //   include: [{ model: Book, as: 'books', attributes: [] }],
    //   attributes: {
    //     include: [[sequelize.fn('COUNT', sequelize.col('books.id')), 'bookCount']]
    //   },
    //   group: ['Author.id'],
    // });
    
    // For now, just get all authors
    const authors = await Author.findAll();
    const plainAuthors = authors.map(author => author.get({ plain: true }));
    
    res.render('authors/index', { authors: plainAuthors, title: 'All Authors' });
  } catch (error) {
    console.error('Error in getAllAuthors:', error);
    res.status(500).render('error', { error: 'Error fetching authors' });
  }
};

// TODO: Implement show author details
export const getAuthor = async (req: Request, res: Response) => {
  try {
    // TODO: Get author with their books
    // const author = await Author.findByPk(req.params.id, {
    //   include: [{ model: Book, as: 'books' }]
    // });
    
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).render('error', { error: 'Author not found' });
    
    const plainAuthor = author.get({ plain: true });
    
    // TODO: Get the books by this author
    // const books = await author.getBooks();
    // const plainBooks = books.map(book => book.get({ plain: true }));
    
    res.render('authors/show', { 
      author: plainAuthor, 
      // books: plainBooks,
      title: plainAuthor.name
    });
  } catch (error) {
    console.error('Error in getAuthor:', error);
    res.status(500).render('error', { error: 'Error fetching author' });
  }
};

// TODO: Implement new author form
export const newAuthorForm = (req: Request, res: Response) => {
  res.render('authors/new', { title: 'Add New Author' });
};

// TODO: Implement edit author form
export const editAuthorForm = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).render('error', { error: 'Author not found' });
    
    const plainAuthor = author.get({ plain: true });
    res.render('authors/edit', { author: plainAuthor, title: `Edit ${plainAuthor.name}` });
  } catch (error) {
    console.error('Error in editAuthorForm:', error);
    res.status(500).render('error', { error: 'Error fetching author' });
  }
};

// TODO: Implement create author
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, bio, birthYear } = req.body;
    
    if (!name) {
      return res.status(400).render('authors/new', {
        error: 'Author name is required',
        author: req.body,
        title: 'Add New Author'
      });
    }

    // TODO: Check if author already exists
    // const existingAuthor = await Author.findOne({ where: { name } });
    // if (existingAuthor) {
    //   return res.status(400).render('authors/new', {
    //     error: 'An author with this name already exists',
    //     author: req.body,
    //     title: 'Add New Author'
    //   });
    // }

    await Author.create({
      name,
      bio: bio || '',
      birthYear: birthYear ? parseInt(birthYear, 10) : null
    });
    
    return res.redirect('/authors');
  } catch (error) {
    console.error('Error in createAuthor:', error);
    return res.status(400).render('authors/new', {
      error: 'Error creating author. Please check your input.',
      author: req.body,
      title: 'Add New Author'
    });
  }
};

// TODO: Implement update author
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).render('error', { error: 'Author not found' });
    
    const { name, bio, birthYear } = req.body;
    
    if (!name) {
      return res.status(400).render('authors/edit', {
        error: 'Author name is required',
        author: { ...req.body, id: req.params.id },
        title: 'Edit Author'
      });
    }
    
    await author.update({
      name,
      bio: bio || '',
      birthYear: birthYear ? parseInt(birthYear, 10) : null
    });
    
    return res.redirect('/authors');
  } catch (error) {
    console.error('Error in updateAuthor:', error);
    return res.status(400).render('authors/edit', { 
      error: 'Error updating author. Please check your input.',
      author: { ...req.body, id: req.params.id },
      title: 'Edit Author'
    });
  }
};

// TODO: Implement delete author
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).render('error', { error: 'Author not found' });
    
    // TODO: Check if author has books and handle them (either prevent deletion or delete books)
    // const bookCount = await author.countBooks();
    // if (bookCount > 0) {
    //   return res.status(400).render('error', { 
    //     error: `Cannot delete author with ${bookCount} books. Remove the books first or reassign them.`
    //   });
    // }
    
    await author.destroy();
    return res.redirect('/authors');
  } catch (error) {
    console.error('Error in deleteAuthor:', error);
    return res.status(500).render('error', { error: 'Error deleting author' });
  }
}; 