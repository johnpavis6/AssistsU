var Note = require('../config/database').Note;
module.exports = {
    getNotes: function (req, res, next) {
        var note = new Note();
        note.find('all', { where: `user_id=${req.session.user_id}`, }, function (err, rows) {
            res.send({ code: 0, notes: rows });
        });
    },
    addNote: function (req, res, next) {
        var note = new Note({
            user_id: req.session.user_id,
            title: req.body.title,
            description: req.body.description,
        });
        note.save();
        res.send({ code: 0, message: 'Note added Successfully' });
    },
};