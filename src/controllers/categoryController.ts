import { Request, Response } from 'express';
import Category from '../models/Category';
import Book from '../models/Book';
// DONE: Import Book model

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    // DONE: Get all categories with their book counts
    const categories = await Category.findAll({include: Book});
    const plainCategories = categories.map((c: Category) => {
      const category = c.get({plain: true});
      category.bookCount = c.Books.length;
      return category;
    });

    res.render('categories/index', {categories: plainCategories})
  } catch (error) {
    console.error('Error in getAllCategories:', error);
    res.status(500).render('error', { error: 'Error fetching categories' });
  }
};

// Get a single category with its books
export const getCategory = async (req: Request, res: Response) => {
  try {
    // DONE: Get category with its books
    const category = await Category.findByPk(req.params.id, { include: Book });
    if (!category) return res.status(404).render('error', { error: "Category not found" });

    const plainCategory = category.get({plain: true});
    res.render('categories/show', {category: plainCategory})
  
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
    if (!category) return res.status(404).render('error', { error: "Category not found" });
   
    //DONE: show edit form for category 
    res.render('categories/edit', category)
    
  } catch (error) {
    console.error('Error in editCategoryForm:', error);
    res.status(500).render('error', { error: 'Error fetching category' });
  }
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {

    // validate that a name was sent
    const {name, description} = req.body;
    if (!name) {
      return res.status(400).send("Category name is required.")
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ where: { name }});
    if (existingCategory) {
      return res.status(400).send("That category already exists.")
    }

    // Create the new category
    const newCategory = await Category.create({
      name: name,
      description: description
    });

    res.redirect('/categories/' + newCategory.id)
  } 
  
  catch (error) {
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
    if (!category) return res.status(404).render('error', { error: "Category not found" });

    const {name, description} = req.body;

    if (!name) {
      return res.status(400).send("Category name is required.")
    }

    //DONE: implement update category
    category.update({
      name: name,
      description: description
    });

    res.redirect('/categories')

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
    //DONE: implement delete
    
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).render('error', { error: "Category not found" });

    // Remove this category from all books that have it
    (await category.getBooks()).forEach((b: Book) => b.removeCategory(category.id));

    // delete the category
    category.destroy();

    res.redirect('/categories')

  } catch (error) {
    console.error('Error in deleteCategory:', error);
    return res.status(500).render('error', { error: 'Error deleting category' });
  }
}; 