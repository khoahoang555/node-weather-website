const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Set up static directory serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, resp) => {
    resp.render('index', {
        title: 'Weather App',
        author: 'Khoa PH'
    });
});

app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'About Me',
        author: 'Khoa PH'
    });
});

app.get('/help', (req, resp) => {
    resp.render('help', {
        title: 'Help Page',
        author: 'Khoa PH'
    });
});

app.get('/products', (req, resp) => {
    if(!req.query.search) {
        return resp.send({
            error: 'You must provide a search term'
        });
    }
    
    console.log(req.query.search);
    resp.send({
        product: []
    })
});

app.get('/weather', (req, resp) => {
    const address = req.query.address;
    if(!address) {
        return resp.send({
            error: 'You must provide a address term'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
           return resp.send({
               error: error
           });
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return resp.send({
                    error: error
                });
            }
            resp.send({
                forecast: forecastData,
                location: location,
                address: address
            });
        });
    });
});

app.get("/help/*", (req, resp) => {
    resp.render('404page', {
        title: '404 Page',
        content: '404 Error. Help article not found!',
        author: 'Khoa PH'
    });
});

app.get('*', (req, resp) => {
    resp.render('404page', {
        title: '404 Page',
        content: '404 Error. Page not found!',
        author: 'Khoa PH'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});