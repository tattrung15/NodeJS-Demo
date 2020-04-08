const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports.addToCart = function (req, res) {
    let sessionID = req.signedCookies.sessionID;
    let productID = req.params.id;

    if(!sessionID){
        res.redirect('/products');
        return;
    }

    let count = db.get('session').find({ id: sessionID}).get('cart.' + productID, 0).value();

    db.get('session').find({ id: sessionID }).set('cart.' + productID, count + 1).write();

    res.redirect('/products');

}