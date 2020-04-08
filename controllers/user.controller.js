const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports.all = (req, res) => {
    res.render('users/users', {
        users: db.get('users').value()
    });
}

module.exports.search = (req, res) => {
    res.render('users/users', {
        users: db.get('users').filter(item => {
            return item.name.toLowerCase().indexOf(req.query.q.toLowerCase()) >= 0;
        }).value()
    })
}

module.exports.create = (req, res) => {
    res.render('users/create');
}

module.exports.get = (req, res) => {
    let id = req.params.id;
    res.render('users/view', {
        user: db.get('users').find({id: id}).value()
    })
}

module.exports.postUser = (req, res) => {
    req.body.id = shortid.generate();
    req.body.avatar = '/uploads/'+ req.file.filename;
    db.get('users').push(req.body).write();
    res.redirect('/users');
}