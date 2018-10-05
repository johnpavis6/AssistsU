var mysql = require('mysql-model');
mysql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dlm'
});
var User = mysql.extend({ tableName: "users", });
var Expense = mysql.extend({ tableName: "expenses", });
var Note = mysql.extend({ tableName: "notes", });
var Article = mysql.extend({ tableName: "articles", });
var Category = mysql.extend({ tableName: "categories", });
var ArticleToCategoryMapping = mysql.extend({ tableName: "article_to_category_mapping", });
var UserToCategoryMapping = mysql.extend({ tableName: "user_to_category_mapping", });
module.exports = {
    User, Expense, Note, Article, Category, ArticleToCategoryMapping, UserToCategoryMapping,
};