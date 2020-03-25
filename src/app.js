const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require(path.join(__dirname, "utils", "geocode"))
const forecast = require(path.join(__dirname, "utils", "forecast"))

const app = express()

// define paths for Express config
const publicPath = path.join(__dirname, "..", "public")
const viewsPath = path.join(__dirname, "..", "templates", "views")
const partialsPath = path.join(__dirname, "..", "templates", "partials")

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)


// setup static dir
app.use(express.static(publicPath))


// routes
app.get("", (req, res) => {
    res.render("index", {
        title: "INDEX",
        name: "Rick"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "ABOUT",
        name: "Rick van Rheenen"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "HELP",
        name: "Rick van Rheenen",
        helpText: "Here I explain some shit."
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "ERROR",
        name: "Rick van Rheenen",
        errorMessage: "Article not found."
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) return res.send({error})
    
        forecast(latitude, longitude, (error, fcData) => {
            if (error) return res.send({error})
           
            res.send({
                forecast: fcData,
                location,
                address: req.query.address
            })
        })
    })

})


app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search term."
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "ERROR",
        name: "Rick van Rheenen",
        errorMessage: "404 page not found."
    })
})


// express listener
app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})