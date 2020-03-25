const request = require("request")

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/453b7a4fce4ef3de868079d9db390ba9/${lat},${long}?units=si`
    request( {url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined)
        } else if (body.error) {
            callback("Unable to find location weather.", undefined)
        } else {
            dailySummary = body.daily.data[0].summary
            currently = body.currently
            callback(undefined, `${dailySummary} It is currenly ${currently.temperature} degrees out, there is ${currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast