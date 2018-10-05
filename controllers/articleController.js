var Article = require('../config/database').Article;
module.exports = {
    fetch: function (req, res, next) {
        var article = new Article();
        var query = `select title,description,category,urlToImage,publishedAt,url from 
        articles as A,article_to_category_mapping as B,categories as C
        where A.id=B.article_id
        and C.id=B.category_id
        and C.id in (select category_id from user_to_category_mapping where user_id=${req.session.user_id})
        limit 21 offset ${req.body.page * 21}`;
        article.query(query, function (err, rows) {
            res.send({ articles: rows });
        });
    },
};