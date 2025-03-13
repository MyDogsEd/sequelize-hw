import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Category from '../models/Category';
// TODO: Import Book model
// import Book from '../models/Book';

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    // TODO: Get all categories with their book counts
    // const categories = await Category.findAll({
    //   include: [{ model: Book, as: 'books', attributes: [] }],
    //   attributes: {
    //     include: [[sequelize.fn('COUNT', sequelize.col('books.id')), 'bookCount']]
    //   },
    //   group: ['Category.id'],
    // });
    
    // For now, just get all categories
    const categories = await Category.findAll();
    const plainCategories = categories.map(category => category.get({ plain: true }));
    
    res.render('categories/index', { categories: plainCategories, title: 'All Categories' });
  } catch (error) {
    console.error('Error in getAllCategories:', error);
    res.status(500).render('error', { error: 'Error fetching categories' });
  }
};

// Get a single category with its books
export const getCategory = async (req: Request, res: Response) => {
  try {
    // TODO: Get category with its books
    // const category = await Category.findByPk(req.params.id, {
    //   include: [{ model: Book, as: 'books' }]
    // });
    
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).render('error', { error: 'Category not found' });
    
    const plainCategory = category.get({ plain: true });
    
    // TODO: Get the books in this category
    // const books = await category.getBooks();
    // const plainBooks = books.map(book => book.get({ plain: true }));
    
    res.render('categories/show', { 
      category: plainCategory, 
      // books: plainBooks,
      title: plainCategory.name
    });
  } catch (error) {
    console.error('Error in getCategory:', error);
    res.status(500).render('error', { error: 'Error fetching category' });
  }
};

// Show form to create a new category
export const newCategoryForm = (req: Request, res: Response) => {
  res.render('categories/new', { title: 'Add New Category' });
};

// Show form to edit a category
export const editCategoryForm = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).render('error', { error: 'Category not found' });
    
    const plainCategory = category.get({ plain: true });
    res.render('categories/edit', { category: plainCategory, title: `Edit ${plainCategory.name}` });
  } catch (error) {
    console.error('Error in editCategoryForm:', error);
    res.status(500).render('error', { error: 'Error fetching category' });
  }
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).render('categories/new', {
        error: 'Category name is required',
        category: req.body,
        title: 'Add New Category'
      });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).render('categories/new', {
        error: 'A category with this name already exists',
        category: req.body,
        title: 'Add New Category'
      });
    }

    await Category.create({
      name,
      description: description || ''
    });
    
    return res.redirect('/categories');
  } catch (error) {
    console.error('Error in createCategory:', error);
    return res.status(400).render('categories/new', {
      error: 'Error creating category. Please check your input.',
      category: req.body,
      title: 'Add New Category'
    });
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).render('error', { error: 'Category not found' });
    
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).render('categories/edit', {
        error: 'Category name is required',
        category: { ...req.body, id: req.params.id },
        title: 'Edit Category'
      });
    }
    
    // Check if another category with the same name exists
    const existingCategory = await Category.findOne({ 
      where: { name, id: { [Op.ne]: req.params.id } } 
    });
    
    if (existingCategory) {
      return res.status(400).render('categories/edit', {
        error: 'A category with this name already exists',
        category: { ...req.body, id: req.params.id },
        title: 'Edit Category'
      });
    }
    
    await category.update({
      name,
      description: description || ''
    });
    
    return res.redirect('/categories');
  } catch (error) {
    console.error('Error in updateCategory:', error);
    return res.status(400).render('categories/edit', { 
      error: 'Error updating category. Please check your input.',
      category: { ...req.body, id: req.params.id },
      title: 'Edit Category'
    });
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).render('error', { error: 'Category not found' });
    
    // TODO: Check if category has books and handle them
    // const bookCount = await category.countBooks();
    // if (bookCount > 0) {
    //   return res.status(400).render('error', { 
    //     error: `Cannot delete category with ${bookCount} books. Remove the books from this category first.`
    //   });
    // }
    
    await category.destroy();
    return res.redirect('/categories');
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    return res.status(500).render('error', { error: 'Error deleting category' });
  }
}; 