// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();
//     |
//     |-----------------------------|
// use session here:                 V
require("./config/session.config")(app);
//                                  ^
//                                  |
// the "app" that gets passed here is the
// previously defined Express app (const app = express();)

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "project-2";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

// authRouter needs to be added so paste the following lines:
const authRouter = require("./routes/auth.routes"); 
app.use("/", authRouter);

const mainRoutes = require("./routes/main.routes");
app.use("/", mainRoutes);

const privateRoutes = require("./routes/private.routes");
app.use("/", privateRoutes);

const moviesRoutes = require("./routes/movies.routes");
app.use("/", moviesRoutes);

const moviesListRoutes = require("./routes/movies-list.routes");
app.use("/", moviesListRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
