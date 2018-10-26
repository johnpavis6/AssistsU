var Article = require('../config/database').Article;
module.exports = {
    fetch: function (req, res, next) {
        var article = new Article();
        var query = `
        select * from
        (select title,description,category,urlToImage,publishedAt,url from 
        articles as D,article_to_category_mapping as E,categories as F
        where D.id=E.article_id
        and F.id=E.category_id
        and F.id in (select category_id from user_to_category_mapping where user_id=${req.session.user_id})
        union 
        select title,description,category,urlToImage,publishedAt,url from 
        articles as D,article_to_category_mapping as E,categories as F
        where D.id=E.article_id
        and F.id=E.category_id
        and F.id in (select category_id from user_to_category_mapping where user_id=${req.session.user_id})
        )as T order by T.publishedAt desc
        limit 40 offset ${req.body.page * 40}`;
        article.query(query, function (err, rows) {
            res.send({ articles: rows });
        });
    },
};