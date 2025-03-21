import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import bookRoutes from './routes/bookRoutes';
import sequelize from './config/database';

// TODO: Import new route files
import authorRoutes from './routes/authorRoutes'
import categoryRoutes from './routes/categoryRoutes'
import createAssociations from './config/associations';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.engine('handlebars', engine({
  helpers: {
    eq: (a: any, b: any) => {a === b},
    includes: (a: any[], b: any) => {a.includes(b)}
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/books', bookRoutes);

// DONE: Use the new routes
app.use('/authors', authorRoutes)
app.use('/categories', categoryRoutes)

// TODO: Add route for dashboard

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

createAssociations();

startServer(); 