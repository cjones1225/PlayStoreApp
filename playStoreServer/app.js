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

    let results = apps;

    if(genres){
        results = apps.filter(app => {
           return app.Genres.toLowerCase().includes(genres.toLowerCase())
        })
    }

    if(sort) {
        if(app){
            results.sort((a, b) => {
                var AppA = a.App.toUpperCase();
                var AppB = b.App.toUpperCase();
                if (AppA < AppB) {
                    return -1;
                } else if(AppA > AppB){
                    return 1;
                } else {
                    return 0;
                }
            })
        }else if(rating){
            results.sort((a, b) => {
                return a.Rating - b.Rating;
            })
        } else {
            return results;
        }
    };

    res.json(results);
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});