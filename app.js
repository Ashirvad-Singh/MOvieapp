const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Route for rendering the index page
app.get('/', (req, res) => {
    res.render('index', { data: {} }); // Passing empty data initially
});

// Route for handling movie search results
app.get('/results', (req, res) => {
    let query = req.query.search;
    request(`https://api.themoviedb.org/3/search/movie?api_key=3015837e19a8dc09f3a7186d872d977a&query=${query}`, (error, response, body) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching movie data');
            return;
        }
        let data = JSON.parse(body);
        res.render('index', { data: data, searchQuery: query });
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
