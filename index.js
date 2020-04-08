require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const middleWares = require('./middlewares/auth.middleware');
const productRouter = require('./routes/product.route');
const sessionMiddleWare = require('./middlewares/session.middleware');
const cartRouter = require('./routes/cart.route');
const transferRouter = require('./routes/transfer.route');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleWare);
const csurfProtection = csurf({cookie:true});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Tat Trung'
    });
});

app.use('/users', csurfProtection, middleWares.requireAuth, userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/transfer', csurfProtection, middleWares.requireAuth, transferRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});