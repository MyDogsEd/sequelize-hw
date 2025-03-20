import { Request, Response } from 'express';

// DONE: Import Book model
import Book from '../models/Book'

// DONE: Import Author model
import Author from '../models/Author';


// DONE: Implement get all authors
export const getAllAuthors = async (req: Request, res: Response) => {
    // DONE: Get all authors with their book counts
    try {
        const authors = Author.findAll();
        res.render('authors/index', authors)
    } catch (err) {
        console.error('Error in getAllBooks:', err);
        res.status(500).render('error', { error: 'Error fetching authors' });
    }
};

// TODO: Implement show author details
export const getAuthor = async (req: Request, res: Response) => {
    // TODO: Get author with their books
    try {
        const author = await Author.findByPk(req.params.id);
        if (!author) return res.status(404).render('error', { error: "Author not found" });
        const plainAuthor = author.get({plain: true});
        
        const books = author.getBooks()
        res.render('authors/show', plainAuthor)
    } catch (err) {
        console.error('Error in getAllBooks:', err);
        res.status(500).render('error', { error: 'Error fetching authors' });
    }
};

// TODO: Implement new author form
export const newAuthorForm = (req: Request, res: Response) => {
};

// TODO: Implement edit author form
export const editAuthorForm = async (req: Request, res: Response) => {
  
};

// TODO: Implement create author
export const createAuthor = async (req: Request, res: Response) => {
  
    // TODO: Check if author already exists
   
};

// TODO: Implement update author
export const updateAuthor = async (req: Request, res: Response) => {
 
};

// TODO: Implement delete author
export const deleteAuthor = async (req: Request, res: Response) => {
 
    // TODO: Check if author has books and handle them (either prevent deletion or delete books)
   
}; 