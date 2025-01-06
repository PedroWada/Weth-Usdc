const express = require('express');
const app = express();
const cors = require("cors");
const QuoteModel = require('./models/QuoteModel')
app.use(express.json());
app.use(cors());
module.exports = app;


// For backend and exp ress
app.post("/register", async (req, res) => {
        await QuoteModel.create(req.body).then((quote) => {
            res.send(201)
        }).catch((err)=> {
            // console.log(err)
            res.status(400).send({msg: `Error: ${err}`})
        })
});

app.get('/getPrices', async(req, res) => {
    await QuoteModel.find({}).then((quotes) => {
        res.json(quotes)
    }).catch((err)=> {
        console.log(err)
        res.status(500).send({ error: "Internal Server Error" });
    })
})

app.listen(5000, () => {
    console.log('Server running on port 5000')
});