const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b5b1e1f7a9ef209c68fc61be8f264976&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + ' - It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain. The humidity is ' + body.current.humidity + '%. There is ' + body.current.cloudcover + '% cloud cover.' )
        }
    })
}

module.exports = forecast