const mongoose = require('mongoose');
// Schema for users of app
// To connect with your mongoDB database

mongoose.connect('mongodb://localhost:27017/test')

const QuoteSchema = new mongoose.Schema({
    priceWeth: String,
    priceUsdc: String,
    date: {
        type: Date,
        default: Date.now,
    },
});
const QuoteModel = mongoose.model('weth_prices', QuoteSchema);

module.exports = QuoteModel;