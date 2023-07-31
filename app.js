const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const { connectToDatabase } = require('./db');
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct, searchProducts } = require('./product');
// Cấu hình static middleware cho thư mục public
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.get('/', async (req, res) => {
  const items = await getProducts();
  console.log(items)
  res.render('homepage', { products: items });
});
app.get('/homepage', async (req, res) => {
  const items = await getProducts();
  res.render('homepage', { products: items });
});


app.post('/add', async (req, res) => {
  const { name, price, image, description } = req.body;
  try {
    const newItem = await createProduct({ name, price: parseFloat(price), image, description });
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.render('edit', { product });
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, image, description } = req.body;
  try {
    await updateProduct(id, { name, price: parseFloat(price), image, description });
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProduct(id);
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/toy-manager', async (req, res) => {
  const items = await getProducts();
  res.render('toy-manager', { products: items });
});

app.post('/search', async (req, res) => {
  const { query } = req.body;
  try {
    const items = await searchProducts(query);
    res.render('toy-manager', { products: items });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on :${PORT}`)
})
