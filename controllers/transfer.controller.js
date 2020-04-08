const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports.create = function (req, res){
    res.render('transfer/transfer', {
        csrfToken: req.csrfToken()
    })
};

module.exports.postCreate = function(req, res){
    let acc = {
        id: shortid.generate(),
        amount: parseInt(req.body.amount),
        account: req.body.account,
        userID: req.signedCookies.userID
    }
    db.get('transfers').push(acc).write();
    res.redirect('/transfer/create');
};