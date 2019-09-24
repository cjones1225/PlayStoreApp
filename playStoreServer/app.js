const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const apps = require('./apps-data')

app.use(morgan('common'));
app.use(cors());

app.get('/apps', (req, res) => {
    const { genres, sort } = req.query;

    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Sort must be one of rating or app');
        }
    }

    if(genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
            return res.status(400).send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');
        }
    }

    let results = apps
        .filter(app =>
            app.Genres.toLowerCase().includes(genres.toLowerCase()));

    if(sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    };

    res.json(results);
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});