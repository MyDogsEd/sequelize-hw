import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import bookRoutes from './routes/bookRoutes';
import sequelize from './config/database';

// TODO: Import new route files
// import authorRoutes from './routes/authorRoutes';
// import categoryRoutes from './routes/categoryRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/books', bookRoutes);
// TODO: Use the new routes
// app.use('/authors', authorRoutes);
// app.use('/categories', categoryRoutes);

// TODO: Add route for dashboard
// app.get('/dashboard', async (req, res) => {
//   try {
//     // Get statistics for dashboard
//     const bookCount = await Book.count();
//     const authorCount = await Author.count();
//     const categoryCount = await Category.count();
//     
//     // Get recent books
//     const recentBooks = await Book.findAll({
//       limit: 5,
//       order: [['createdAt', 'DESC']],
//       include: [
//         { model: Author, as: 'author' },
//         { model: Category, as: 'categories' }
//       ]
//     });
//     
//     res.render('dashboard', {
//       title: 'Dashboard',
//       stats: {
//         books: bookCount,
//         authors: authorCount,
//         categories: categoryCount
//       },
//       recentBooks: recentBooks.map(book => book.get({ plain: true }))
//     });
//   } catch (error) {
//     console.error('Error in dashboard:', error);
//     res.status(500).render('error', { error: 'Error loading dashboard' });
//   }
// });

app.get('/', (req, res) => {
  res.redirect('/books');
});

// Database sync and server start
const startServer = async () => {
  try {
    // TODO: Update sync options for development/production
    // Development: Force sync to recreate tables
    // await sequelize.sync({ force: true });
    
    // Production: Don't force sync, just sync what's needed
    await sequelize.sync();
    
    console.log('Database synced successfully');
    
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer(); 