import { Request, Response } from 'express';

// DONE: Import Book model
import Book from '../models/Book'

// DONE: Import Author model
import Author from '../models/Author';


// DONE: Implement get all authors
export const getAllAuthors = async (req: Request, res: Response) => {
    // DONE: Get all authors with their book counts
    try {
        const authors = await Author.findAll();
        const plainAuthors = authors.map((a: Author) => a.get({ plain: true }));
        res.render('authors/index', {authors: plainAuthors});
    } catch (err) {
        console.error('Error in getAllBooks: ', err);
        res.status(500).render('error', { error: 'Error fetching authors' });
    }
};

// DONE: Implement show author details
export const getAuthor = async (req: Request, res: Response) => {
    // DONE: Get author with their books
    try {
        const author = await Author.findByPk(req.params.id);
        if (!author) return res.status(404).render('error', { error: "Author not found" });
        const plainAuthor = author.get({plain: true});
        
        const books = await author.getBooks();
        res.render('authors/show', {author: plainAuthor, books: books})
    } catch (err) {
        console.error('Error in getAuthor: ', err);
        res.status(500).render('error', { error: 'Error fetching author' });
    }
};

// DONE: Implement new author form
export const newAuthorForm = (req: Request, res: Response) => {
    try {
        res.render('authors/new', { 
            title: 'Add New Author',
        });
    } 
    catch (error) {
        console.error('Error in newAuthorForm:', error);
        res.status(500).render('error', { error: 'Error loading form' });
    }
};

// DONE: Implement edit author form
export const editAuthorForm = async (req: Request, res: Response) => {
    try {
        const author = await Author.findByPk(req.params.id);
        if (!author) return res.status(404).render('error', { error: "Author not found" });

        const plainAuthor = author.get({plain: true});
        
        res.render('authors/edit', { 
            author: plainAuthor
        });
    } 
      
    catch (error) {
        console.error('Error in newAuthorForm:', error);
        res.status(500).render('error', { error: 'Error loading form' });
    }
};

// DONE: Implement create author
export const createAuthor = async (req: Request, res: Response) => {
    try {

        // validate that the name exists
        const {name, bio, birthYear} = req.body;
        if (!name) {
            return res.status(400).send("Author name is required.");
        }

        // DONE: Check if author already exists
        const existingAuthor = await Author.findOne({ where: { name } });
        if (existingAuthor){
            return res.status(400).send("Author already exists. Author must be unique.");
        }

        // Create the new author
        const newAuthor = await Author.create({
            name: name,
            bio: bio,
            birthYear: birthYear
        })
        
        // redirect to the newly created author page
        res.redirect('/authors/' + newAuthor.id)
    }

    catch (err) {
        console.error('Error in updateAuthor: ', err);
        res.status(500).render('Error updating author');
    }
};

// DONE: Implement update author
export const updateAuthor = async (req: Request, res: Response) => {
    try {
        // get author by id
        const author = await Author.findByPk(req.params.id);
        if (!author) return res.status(404).render('error', { error: "Author not found" });

        // verify name is not blank
        const {name, bio, birthYear} = req.body;
        if (!name) {
            return res.status(400).send("Author name required.")
        }

        // update the author
        author.update({
            name,
            bio,
            birthYear
        })

        // redirect to the updated author page
        return res.redirect('/authors/' + req.params.id)
    }

    catch (err) {
        console.error('Error in updateAuthor: ', err);
        res.status(500).render('Error updating author');
    }
 
};

// DONE: Implement delete author
export const deleteAuthor = async (req: Request, res: Response) => {
    try {
        // Get the author by id
        const author = await Author.findByPk(req.params.id);
        if (!author) return res.status(404).render('error', { error: "Author not found" });

        // If the author has associated books, delete them.
        const books = await author.getBooks();
        if (books.length) {
            books.forEach((book: Book) => book.destroy());
        }

        // Delete the author.
        author.destroy();
    } 
    
    catch (err){
        console.error('Error in deleteAuthor: ', err);
        res.status(500).send('Error deleting author');
    }
    // DONE: Check if author has books and handle them (either prevent deletion or delete books)
}; 