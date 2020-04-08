const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports.products = function(req, res){
    let page = parseInt(req.query.page) || 1;
    let perPage = 8;

    let begin = (page - 1) * perPage;
    //let end = page * perPage;

    let nextPage = {};
    let previousPage = {};

    nextPage.url = '/products?page=' + (page + 1);
    nextPage.number = page + 1;
    
    previousPage.url = '/products?page=' + (page - 1);
    previousPage.number = page - 1;

    res.render('products/products', {
        // products: db.get('products').value().slice(begin, end)
        products: db.get('products').drop(begin).take(perPage).value(),
        currentPage: page,
        nextPage:  nextPage,
        previousPage: previousPage,
        topUrl: '/products?page=1',
        endPage: {
            url: '/products?page=' + parseInt(Math.floor(db.get('products').size()/8) + 1),
            number: parseInt(Math.floor(db.get('products').size()/8) + 1)
        }
    });
};