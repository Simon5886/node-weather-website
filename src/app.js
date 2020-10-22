const path = require('path')
const express  = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express()
const port = 3000

//setup handlebars and views location.
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

//routes
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Simon Marshall'
    })
})



app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Simon Marshall'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Weather App help',
        message: 'please follow the instructions below to use our weather app.',
        name: 'Simon Marshall'
    })
})

app.get('/weather', (req,res) => {

    if (!req.query.address) {
        return res.send({
            error: "No address provided, please provide an address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                     error
                })
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        })
    })
})


app.get('/help/*',(req,res) => {
    

    res.render('404', {
        title: '404 - article not found',
        errorMessage: 'article not found',
        name: 'Simon Marshall'
    })
})

app.get('*',(req,res) => {
    

    res.render('404', {
        title: '404 - page not found',
        errorMessage: 'Page not found',
        name: 'Simon Marshall'
    })
})

//run app
app.listen(port, () => {
    console.log(`Server started, listening at http://localhost:${port}`)
})