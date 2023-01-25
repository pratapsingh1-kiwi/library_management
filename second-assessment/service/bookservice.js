const book = require('../schema/book');

const bookDetails = async function (req) {
    const doc = new book({
        title: req.body.title,
        stock: req.body.stock,
        author: req.body.author,
        description: req.body.description,
        category: req.body.category,
    });
    const obj = await doc.save()
    return obj;


}