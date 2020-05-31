//require the db and the connection settings in the mongoose file
const path = require("path");
const hbs = require("hbs");
//require express
const express = require(`express`);

//require other files in the application
const shortnerRouter = require("./routers/shortner");
require("./db/mongoose");

//instantiating express and creating a dynamic port because of deployment
const app = express();
const port = process.env.PORT;

//beinging in the task routes and the user routes
app.use(express.json());

// Define paths  for express views
const viewsPath = path.join(__dirname, "../src/templates/views");
const partialsPath = path.join(__dirname, "../src/templates/partials");
const publicDirectory = path.join(__dirname, "../public");

console.log(viewsPath);

// setup handle bars and views directory
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// // // // // // //

// nodemon app.js -e js,hbs
//setup static directory to serve
app.use(express.static(publicDirectory));

app.use(shortnerRouter);

//port to run on and listen on
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});
